import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import ConfirmPopup from "../components/confirmPopup";

export default function CalendarComp() {
  const { width } = useWindowDimensions();
  const { user, loading } = useAuth();
  const { t, i18n } = useTranslation();

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [calendarValue, setCalendarValue] = useState(null);

  const [disabledDates, setDisabledDates] = useState([]);
  const [prices, setPrices] = useState([]);

  // Popup state for confirming block removal
  const [blockToRemove, setBlockToRemove] = useState(null);

  // Key to force calendar re-render when clearing selection
  const [calendarKey, setCalendarKey] = useState(0);

  // Price management state (for admin)
  const [priceStartDate, setPriceStartDate] = useState("");
  const [priceEndDate, setPriceEndDate] = useState("");
  const [priceAmount, setPriceAmount] = useState("");

  useEffect(() => {
    fetchDisabledDates();
    fetchPrices();
  }, []);

  // Clear selection when remove popup is shown
  useEffect(() => {
    if (blockToRemove) {
      setCalendarValue(null);
      setCheckIn();
      setCheckOut();
      // Force calendar to re-render to clear its internal selection state
      setCalendarKey((prev) => prev + 1);
    }
  }, [blockToRemove]);

  const fetchDisabledDates = async () => {
    try {
      const data = await getBookedDates();
      setDisabledDates(data);
    } catch {
      setDisabledDates([]);
      toast.error(t("toast.fetchDatesError"));
    }
  };

  const fetchPrices = async () => {
    try {
      const data = await getPrices();
      setPrices(data);
    } catch {
      setPrices([]);
      toast.error(t("toast.fetchPricesError"));
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

  // Check if a date falls within a blocked range (exclusive of boundaries)
  // Boundaries (start/end dates) remain selectable for same-day check-in/check-out
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
      return dateTimestamp > startTimestamp && dateTimestamp < endTimestamp;
    });
  };

  // Check if a date is blocked
  const isDateBlocked = (date) => {
    return !!getBlockForDate(date);
  };

  // Check if a date is a boundary (start or end) of any booking
  // Also tracks if start and end are from different bookings (meaning fully booked)
  const getDateBoundaryType = (date) => {
    const dateTimestamp = Math.floor(
      new Date(date.toLocaleDateString("en")).getTime() / 1000
    );

    let startFromBookingId = null;
    let endFromBookingId = null;

    disabledDates.forEach((disabledDate) => {
      const startTimestamp = Math.floor(
        new Date(new Date(disabledDate.startDate).toLocaleDateString("en")).getTime() / 1000
      );
      const endTimestamp = Math.floor(
        new Date(new Date(disabledDate.endDate).toLocaleDateString("en")).getTime() / 1000
      );

      if (dateTimestamp === startTimestamp) startFromBookingId = disabledDate.id;
      if (dateTimestamp === endTimestamp) endFromBookingId = disabledDate.id;
    });

    const isStart = startFromBookingId !== null;
    const isEnd = endFromBookingId !== null;
    // If both start and end exist and are from different bookings, the day is fully booked
    const isFullyBooked = isStart && isEnd && startFromBookingId !== endFromBookingId;

    return { isStart, isEnd, isFullyBooked };
  };

  // Find any block that includes this date (including start/end boundaries) - for admin to remove blocks
  const getBlockIncludingBoundaries = (date) => {
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

  // Handle clicking on a day (for admin to remove blocks)
  const onClickDay = (date) => {
    if (!user) return;

    const { isStart, isEnd, isFullyBooked } = getDateBoundaryType(date);
    const isBlocked = isDateBlocked(date);

    // Show remove popup for fully blocked dates
    if (isBlocked || isFullyBooked) {
      const block = getBlockIncludingBoundaries(date);
      if (block) {
        setBlockToRemove(block);
      }
      return;
    }

    // For boundary dates (half-blocked), check if this is a 1-night block
    // that has no "middle" date to click on
    if (isStart || isEnd) {
      const block = getBlockIncludingBoundaries(date);
      if (block) {
        const startDate = new Date(block.startDate);
        const endDate = new Date(block.endDate);
        const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        // For 1-night blocks only, show popup on boundary click since there's no middle to click
        if (daysDiff === 1) {
          setBlockToRemove(block);
        }
      }
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
          t("toast.blockAdded", { startDate: checkIn, endDate: checkOut })
        );
      } catch {
        toast.error(t("toast.blockError"));
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
      toast.success(t("toast.blockRemoved"));
    } catch {
      toast.error(t("toast.blockRemoveError"));
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
        toast.success(t("toast.priceAdded"));
      } catch {
        toast.error(t("toast.priceError"));
      }
    }
  };

  const removePrice = async (price) => {
    try {
      await deletePrice(price.id);
      fetchPrices();
      toast.success(t("toast.priceRemoved"));
    } catch {
      toast.error(t("toast.priceRemoveError"));
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
      pending: t("toast.emailPending"),
      success: t("toast.emailSent"),
      error: t("toast.emailError"),
    });
  };

  // Get calendar locale based on current language
  const getCalendarLocale = () => {
    const lang = i18n.language?.substring(0, 2);
    return lang === "hr" ? "hr" : "en";
  };

  return (
    <>
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
              <h2 className="calendarFormTitle">{t("calendar.title")}</h2>
              <p className="calendarFormDescription">
                {t("calendar.description")}
              </p>
              <label htmlFor="Check-In" className="TopMinusFive">
                {t("calendar.checkInDate")}
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
                {t("calendar.checkOutDate")}
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
                {t("calendar.name")}
              </label>
              <input
                required
                type="text"
                id="Name"
                placeholder={t("calendar.namePlaceholder")}
                className="CalendarElement__Text_Input"
              />
              <label htmlFor="Email" className="TopMinusFive">
                {t("calendar.email")}
              </label>
              <input
                required
                type="email"
                id="Email"
                placeholder={t("calendar.emailPlaceholder")}
                className="CalendarElement__Text_Input"
              />
              <label htmlFor="ContactNumber" className="TopMinusFive">
                {t("calendar.contactNumber")}
              </label>
              <input
                required
                id="ContactNumber"
                className="CalendarElement__Text_Input"
                placeholder={t("calendar.phonePlaceholder")}
              />
              <label htmlFor="ContactTextArea" className="TopMinusFive">
                {t("calendar.message")}
              </label>
              <textarea
                required
                type="textarea"
                id="ContactTextArea"
                placeholder={t("calendar.messagePlaceholder")}
                className="calendarTextField"
              />
              <button
                type="submit"
                className="CalendarElement__MakeReservationButton calendarButton"
              >
                {t("calendar.makeReservation")}
              </button>
            </>
          ) : (
            <>
              <label htmlFor="Check-In" className="TopMinusFive">
                {t("calendar.selectCheckInDate")}
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
                {t("calendar.selectCheckOutDate")}
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
                {t("calendar.block")}
              </button>
            </>
          )}
        </form>
        <Calendar
          key={calendarKey}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          returnValue="range"
          tileDisabled={({ date, view }) => {
            // For admin users, don't disable blocked dates so they can click to remove
            if (user) return false;

            const { isFullyBooked } = getDateBoundaryType(date);
            // If checkout and check-in from different bookings meet on same day, it's fully booked
            if (isFullyBooked) return true;

            const dateTimestamp = Math.floor(
              new Date(date.toLocaleDateString("en")).getTime() / 1000
            );

            return disabledDates.some((disabledDate) => {
              const startTimestamp = Math.floor(
                new Date(
                  new Date(disabledDate.startDate).toLocaleDateString("en")
                ).getTime() / 1000
              );
              const endTimestamp = Math.floor(
                new Date(
                  new Date(disabledDate.endDate).toLocaleDateString("en")
                ).getTime() / 1000
              );

              // Only disable dates strictly between start and end (exclusive of both boundaries)
              // This allows check-in/check-out on the same day:
              // - Previous guest can checkout on start date
              // - New guest can check-in on end date
              return dateTimestamp > startTimestamp && dateTimestamp < endTimestamp;
            });
          }}
          tileClassName={({ date, view }) => {
            if (view !== "month") return null;

            const classes = [];
            const { isStart, isEnd, isFullyBooked } = getDateBoundaryType(date);
            const isBlocked = isDateBlocked(date);

            if (user) {
              // Admin view - show half-blocked styling for boundaries
              if (isBlocked || isFullyBooked) {
                classes.push("blocked-date-admin");
              } else {
                if (isStart) classes.push("half-blocked-start-admin");
                if (isEnd) classes.push("half-blocked-end-admin");
              }
            }
            // Public view - no half-blocked styling, boundaries appear as fully open

            return classes.length > 0 ? classes.join(" ") : null;
          }}
          onClickDay={user ? onClickDay : undefined}
          selectRange={true}
          locale={getCalendarLocale()}
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
          <h2 className="priceManagementTitle">{t("calendar.managePrices")}</h2>
          <form onSubmit={submitPrice} className="priceForm">
            <div className="priceFormRow">
              <label htmlFor="priceStartDate">{t("calendar.startDate")}</label>
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
              <label htmlFor="priceEndDate">{t("calendar.endDate")}</label>
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
              <label htmlFor="priceAmount">{t("calendar.pricePerNight")}</label>
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
              {t("calendar.addPrice")}
            </button>
          </form>

          <div className="pricesList">
            {sortPrices().map((price) => (
              <div className="priceItem" key={price.id}>
                <div className="priceDetails">
                  <span>{mmddToDdmm(price.startDate)}</span> - <span>{mmddToDdmm(price.endDate)}</span>:{" "}
                  <strong>{price.price}€</strong>{t("calendar.perNight")}
                </div>
                <button
                  onClick={() => removePrice(price)}
                  className="CalendarElement__BlockReservationButton"
                >
                  {t("calendar.remove")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation popup for removing blocks */}
      {blockToRemove && (
        <ConfirmPopup
          message={t("popup.removeBlockMessage", { startDate: blockToRemove.startDate, endDate: blockToRemove.endDate })}
          onConfirm={confirmRemoveBlock}
          onCancel={cancelRemoveBlock}
        />
      )}
    </>
  );
}
