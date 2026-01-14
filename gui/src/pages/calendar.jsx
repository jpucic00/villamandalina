import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../assets/style/reactCalendar.css";
import "../assets/style/CalendarElement.css";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import {
  getBookedDates,
  createBookedDate,
  deleteBookedDate,
  getPrices,
  createPrice,
  deletePrice,
} from "../api";
import emailjs from "@emailjs/browser";
import MoreDetails from "../components/moreDetails";
import ConfirmPopup from "../components/confirmPopup";

export default function CalendarComp() {
  const { width } = useWindowDimensions();
  const { user, loading } = useAuth();

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [calendarValue, setCalendarValue] = useState(null);

  const [disabledDates, setDisabledDates] = useState([]);
  const [prices, setPrices] = useState([]);

  // Popup state for confirming block removal
  const [blockToRemove, setBlockToRemove] = useState(null);

  // Price management state (for admin)
  const [priceStartDate, setPriceStartDate] = useState("");
  const [priceEndDate, setPriceEndDate] = useState("");
  const [priceAmount, setPriceAmount] = useState("");

  useEffect(() => {
    fetchDisabledDates();
    fetchPrices();
  }, []);

  const fetchDisabledDates = async () => {
    try {
      const data = await getBookedDates();
      setDisabledDates(data);
    } catch {
      setDisabledDates([]);
      toast.error("Something went wrong fetching calendar booked dates");
    }
  };

  const fetchPrices = async () => {
    try {
      const data = await getPrices();
      setPrices(data);
    } catch {
      setPrices([]);
      toast.error("Something went wrong fetching prices");
    }
  };

  const sortPrices = () => {
    return prices.sort(function (a, b) {
      return a.startDate.localeCompare(b.startDate);
    });
  };

  // Convert DD.MM to MM-DD for internal storage
  const ddmmToMmdd = (ddmm) => {
    if (!ddmm || !ddmm.includes('.')) return ddmm;
    const [day, month] = ddmm.split('.');
    return `${month}-${day}`;
  };

  // Convert MM-DD to DD.MM for display
  const mmddToDdmm = (mmdd) => {
    if (!mmdd || !mmdd.includes('-')) return mmdd;
    const [month, day] = mmdd.split('-');
    return `${day}.${month}`;
  };

  const formatDate = (e) => {
    const offset = e.getTimezoneOffset();
    let date = new Date(e.getTime() - offset * 60 * 1000);
    return (date = date.toISOString().split("T")[0]);
  };

  // Check if a date falls within a blocked range
  const getBlockForDate = (date) => {
    const dateTimestamp = Math.floor(
      new Date(date.toLocaleDateString("en")).getTime() / 1000
    );
    return disabledDates.find((disabledDate) => {
      const startTimestamp = Math.floor(
        new Date(new Date(disabledDate.startDate).toLocaleDateString("en")).getTime() / 1000
      );
      const endTimestamp = Math.floor(
        new Date(new Date(disabledDate.endDate).toLocaleDateString("en")).getTime() / 1000
      );
      return dateTimestamp >= startTimestamp && dateTimestamp <= endTimestamp;
    });
  };

  // Check if a date is blocked
  const isDateBlocked = (date) => {
    return !!getBlockForDate(date);
  };

  // Handle clicking on a day (for admin to remove blocks)
  const onClickDay = (date) => {
    if (!user) return;

    const block = getBlockForDate(date);
    if (block) {
      setBlockToRemove(block);
    }
  };

  const confirmRemoveBlock = () => {
    if (blockToRemove) {
      removeBlock(blockToRemove);
      setBlockToRemove(null);
    }
  };

  const cancelRemoveBlock = () => {
    setBlockToRemove(null);
  };

  // Handle date selection for both admin and public users
  const handleCalendarChange = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      // Range selection - keep Date objects for calendar display
      setCalendarValue(value);
      setCheckIn(formatDate(value[0]));
      setCheckOut(formatDate(value[1]));
    }
  };

  const onCheckInSelect = (e) => {
    const newCheckIn = new Date(e.target.value + "T00:00:00");
    const existingCheckOut = checkOut ? new Date(checkOut + "T00:00:00") : null;
    setCalendarValue([newCheckIn, existingCheckOut]);
    setCheckIn(e.target.value);
  };

  const onCheckOutSelect = (e) => {
    const existingCheckIn = checkIn ? new Date(checkIn + "T00:00:00") : null;
    const newCheckOut = new Date(e.target.value + "T00:00:00");
    setCalendarValue([existingCheckIn, newCheckOut]);
    setCheckOut(e.target.value);
  };

  const submitBlock = async (e) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      try {
        await createBookedDate(checkIn, checkOut);
        setCheckIn();
        setCheckOut();
        setCalendarValue(null);
        fetchDisabledDates();
        document.getElementById("reservationForm").reset();
        toast.success(
          `Block for dates between ${checkIn} and ${checkOut} added`
        );
      } catch {
        toast.error("Not possible to block these dates, try again");
      }
    }
  };

  const removeBlock = async (date) => {
    try {
      await deleteBookedDate(date.id);
      setCheckIn();
      setCheckOut();
      setCalendarValue(null);
      fetchDisabledDates();
      document.getElementById("reservationForm").reset();
      toast.success(`Block removed successfully`);
    } catch {
      toast.error("Not possible to remove this block, try again");
    }
  };

  const submitPrice = async (e) => {
    e.preventDefault();
    if (priceStartDate && priceEndDate && priceAmount) {
      try {
        await createPrice(ddmmToMmdd(priceStartDate), ddmmToMmdd(priceEndDate), priceAmount);
        setPriceStartDate("");
        setPriceEndDate("");
        setPriceAmount("");
        fetchPrices();
        toast.success(`Price added successfully`);
      } catch {
        toast.error("Not possible to add this price, try again");
      }
    }
  };

  const removePrice = async (price) => {
    try {
      await deletePrice(price.id);
      fetchPrices();
      toast.success(`Price removed successfully`);
    } catch {
      toast.error("Not possible to remove this price, try again");
    }
  };

  const SendEmail = (templateParams) =>
    new Promise((resolve, reject) => {
      emailjs
        .send(
          "service_s6zkdbo",
          "template_4rhgldh",
          templateParams,
          "TO7HNsppourbFcFDU"
        )
        .then(() => {
          document.getElementById("reservationForm").reset();
          setCheckIn();
          setCheckOut();
          setCalendarValue(null);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });

  const submitReservation = (e) => {
    e.preventDefault();
    let templateParams = {
      startDate: e.target[0].value,
      endDate: e.target[1].value,
      name: e.target[2].value,
      email: e.target[3].value,
      number: e.target[4].value,
      message: e.target[5].value,
    };

    toast.promise(SendEmail(templateParams), {
      pending: "Email is being sent please wait...",
      success: "Email sent",
      error:
        "There was an issue with sending of the email, please try again later",
    });
  };

  return (
    <>
      <h1 className="calendarPageTitle">Select dates</h1>
      <div
        className={`CalendarElement__MainWrapper ${user && "loggedIn"
          } ${deviceCheck(width)}`}
      >
        <form
          id="reservationForm"
          onSubmit={user ? submitBlock : submitReservation}
          className="CalendarElement__FormWrapper"
        >
          {!loading && !user ? (
            <>
              <label htmlFor="Check-In" className="TopMinusFive">
                Select Check-In Date
              </label>
              <input
                required
                onChange={onCheckInSelect}
                type="date"
                id="Check-In"
                min={formatDate(new Date())}
                max={checkOut}
                value={checkIn && checkIn}
                className="CalendarElement__Date_Input"
              />
              <label htmlFor="Check-Out" className="TopMinusFive">
                Select Check-Out Date
              </label>
              <input
                required
                type="date"
                onChange={onCheckOutSelect}
                value={checkOut && checkOut}
                min={checkIn ? checkIn : formatDate(new Date())}
                id="Check-Out"
                className="CalendarElement__Date_Input"
              />
              <label htmlFor="Name" className="TopMinusFive">
                Name
              </label>
              <input
                required
                type="text"
                id="Name"
                placeholder="Enter your name"
                className="CalendarElement__Text_Input"
              />
              <label htmlFor="Email" className="TopMinusFive">
                Email
              </label>
              <input
                required
                type="email"
                id="Email"
                placeholder="Enter your email"
                className="CalendarElement__Text_Input"
              />
              <label htmlFor="ContactNumber" className="TopMinusFive">
                Contact Number
              </label>
              <input
                required
                id="ContactNumber"
                className="CalendarElement__Text_Input"
                placeholder="Enter your mobile or phone number"
              />
              <label htmlFor="ContactTextArea" className="TopMinusFive">
                Message
              </label>
              <textarea
                required
                type="textarea"
                id="ContactTextArea"
                placeholder="Enter a message"
                className="calendarTextField"
              />
              <button
                type="submit"
                className="CalendarElement__MakeReservationButton calendarButton"
              >
                Make a Reservation
              </button>
            </>
          ) : (
            <>
              <label htmlFor="Check-In" className="TopMinusFive">
                Select Check-In Date
              </label>
              <input
                required
                onChange={onCheckInSelect}
                type="date"
                id="Check-In"
                min={formatDate(new Date())}
                max={checkOut}
                value={checkIn && checkIn}
                className="CalendarElement__Date_Input"
              />
              <label htmlFor="Check-Out" className="TopMinusFive">
                Select Check-Out Date
              </label>
              <input
                required
                onChange={onCheckOutSelect}
                type="date"
                min={checkIn ? checkIn : formatDate(new Date())}
                value={checkOut && checkOut}
                id="Check-Out"
                className="CalendarElement__Date_Input"
              />
              <button
                type="submit"
                className="CalendarElement__MakeReservationButton calendarButton"
              >
                Block
              </button>
            </>
          )}
        </form>
        <Calendar
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          returnValue="range"
          tileDisabled={({ date, view }) => {
            // For admin users, don't disable blocked dates so they can click to remove
            if (user) return false;

            return (
              disabledDates.filter((disabledDate) => {
                return (
                  Math.floor(
                    new Date(date.toLocaleDateString("en")).getTime() / 1000
                  ) >
                  Math.floor(
                    new Date(
                      new Date(disabledDate.startDate).toLocaleDateString(
                        "en"
                      )
                    ).getTime() / 1000
                  ) &&
                  Math.floor(
                    new Date(date.toLocaleDateString("en")).getTime() / 1000
                  ) <
                  Math.floor(
                    new Date(
                      new Date(disabledDate.endDate).toLocaleDateString("en")
                    ).getTime() / 1000
                  )
                );
              }).length > 0 ||
              disabledDates.filter(
                (disabledDate) =>
                  Math.floor(
                    new Date(date.toLocaleDateString("en")).getTime() / 1000
                  ) ===
                  Math.floor(
                    new Date(
                      new Date(disabledDate.startDate).toLocaleDateString(
                        "en"
                      )
                    ).getTime() / 1000
                  ) ||
                  Math.floor(
                    new Date(date.toLocaleDateString("en")).getTime() / 1000
                  ) ===
                  Math.floor(
                    new Date(
                      new Date(disabledDate.endDate).toLocaleDateString("en")
                    ).getTime() / 1000
                  )
              ).length > 1
            );
          }}
          tileClassName={({ date, view }) => {
            if (view === "month" && user && isDateBlocked(date)) {
              return "blocked-date-admin";
            }
            return null;
          }}
          onClickDay={user ? onClickDay : undefined}
          selectRange={true}
          locale={"en"}
          onChange={handleCalendarChange}
          value={calendarValue}
          minDate={new Date()}
          tileContent={({ date, view }) => {
            if (view !== "month") return null;

            const matchingPrice = prices.find((price) => {
              try {
                if (!price.startDate || !price.endDate) return false;

                const dateTimestamp = Math.floor(
                  new Date(date.toLocaleDateString("en")).getTime() / 1000
                );
                const startTimestamp = Math.floor(
                  new Date(
                    new Date(
                      date.getFullYear() + "-" + price.startDate
                    ).toLocaleDateString("en")
                  ).getTime() / 1000
                );
                const endTimestamp = Math.floor(
                  new Date(
                    new Date(
                      date.getFullYear() + "-" + price.endDate
                    ).toLocaleDateString("en")
                  ).getTime() / 1000
                );

                return dateTimestamp >= startTimestamp && dateTimestamp <= endTimestamp;
              } catch {
                return false;
              }
            });

            return (
              <p className="calendarPrice">
                {matchingPrice?.price || "-"}€
              </p>
            );
          }}
        />
      </div>

      {/* Admin: Price Management */}
      {!loading && user && (
        <div className="priceManagementContainer">
          <h2 className="priceManagementTitle">Manage Prices</h2>
          <form onSubmit={submitPrice} className="priceForm">
            <div className="priceFormRow">
              <label htmlFor="priceStartDate">Start (DD.MM)</label>
              <input
                type="text"
                id="priceStartDate"
                placeholder="01.01"
                pattern="\d{2}\.\d{2}"
                value={priceStartDate}
                onChange={(e) => setPriceStartDate(e.target.value)}
                className="CalendarElement__Text_Input"
                required
              />
            </div>
            <div className="priceFormRow">
              <label htmlFor="priceEndDate">End (DD.MM)</label>
              <input
                type="text"
                id="priceEndDate"
                placeholder="31.01"
                pattern="\d{2}\.\d{2}"
                value={priceEndDate}
                onChange={(e) => setPriceEndDate(e.target.value)}
                className="CalendarElement__Text_Input"
                required
              />
            </div>
            <div className="priceFormRow">
              <label htmlFor="priceAmount">Price (€/night)</label>
              <input
                type="number"
                id="priceAmount"
                placeholder="99"
                value={priceAmount}
                onChange={(e) => setPriceAmount(e.target.value)}
                className="CalendarElement__Text_Input"
                required
              />
            </div>
            <button
              type="submit"
              className="CalendarElement__MakeReservationButton calendarButton"
            >
              Add Price
            </button>
          </form>

          <div className="pricesList">
            {sortPrices().map((price) => (
              <div className="priceItem" key={price.id}>
                <div className="priceDetails">
                  <span>{mmddToDdmm(price.startDate)}</span> - <span>{mmddToDdmm(price.endDate)}</span>:{" "}
                  <strong>{price.price}€</strong>/night
                </div>
                <button
                  onClick={() => removePrice(price)}
                  className="CalendarElement__BlockReservationButton"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <MoreDetails />

      {/* Confirmation popup for removing blocks */}
      {blockToRemove && (
        <ConfirmPopup
          message={`Remove block from ${blockToRemove.startDate} to ${blockToRemove.endDate}?`}
          onConfirm={confirmRemoveBlock}
          onCancel={cancelRemoveBlock}
        />
      )}
    </>
  );
}
