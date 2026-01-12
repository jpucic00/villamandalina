import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../assets/style/reactCalendar.css";
import "../assets/style/CalendarElement.css";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { ref, get, set, remove } from "firebase/database";
import emailjs from "@emailjs/browser";
import MoreDetails from "../components/moreDetails";

export default function CalendarComp() {
  const { width } = useWindowDimensions();
  const [user, loading] = useAuthState(auth);

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [calendarValue, setCalendarValue] = useState([]);

  const [disabledDates, setDisabledDates] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getDisabledDates();
    getPrices();
  }, []);

  const getDisabledDates = () => {
    const refrence = ref(db, "/bookedDates");
    get(refrence)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDisabledDates(
            Object.keys(snapshot.val()).map((key) => {
              return { ...snapshot.val()[key], key: key };
            })
          );
        } else {
          setDisabledDates([]);
        }
      })
      .catch(() => {
        setDisabledDates([]);
        toast.error("Something went wrong fetching calendar booked dates");
      });
  };

  const getPrices = () => {
    const refrence = ref(db, "/Prices");
    get(refrence)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPrices(
            Object.keys(snapshot.val()).map((key) => {
              return { ...snapshot.val()[key], key: key };
            })
          );
        } else {
          setPrices([]);
        }
      })
      .catch(() => {
        setPrices([]);
        toast.error("Something went wrong fetching calendar booked dates");
      });
  };

  const sortDisableDates = () => {
    return disabledDates.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.startDate) - new Date(b.startDate);
    });
  };

  const formatDate = (e) => {
    const offset = e.getTimezoneOffset();
    let date = new Date(e.getTime() - offset * 60 * 1000);
    return (date = date.toISOString().split("T")[0]);
  };

  const onDateSelect = (e) => {
    setCalendarValue([formatDate(e[0]), formatDate(e[1])]);
    setCheckIn(formatDate(e[0]));

    setCheckOut(formatDate(e[1]));
  };

  const onCheckInSelect = (e) => {
    setCalendarValue([e.target.value, checkOut ? checkOut : null]);
    setCheckIn(e.target.value);
  };

  const onCheckOutSelect = (e) => {
    setCalendarValue([checkIn ? checkIn : null, e.target.value]);
    setCheckOut(e.target.value);
  };

  const submitBlock = (e) => {
    e.preventDefault();
    if (checkIn && checkOut)
      set(ref(db, `/bookedDates/${disabledDates.length + 1}`), {
        startDate: `${checkIn}`,
        endDate: `${checkOut}`,
      })
        .then(() => {
          setCheckIn();
          setCheckOut();
          setCalendarValue([]);
          getDisabledDates();
          document.getElementById("reservationForm").reset();
          toast.success(
            `Block for dates between ${checkIn} and ${checkOut} added`
          );
        })
        .catch(() => {
          toast.error("Not possible to block these dates, try again");
        });
  };
  const removeBlock = (e) => {
    remove(ref(db, `/bookedDates/${e.key}`))
      .then(() => {
        setCheckIn();
        setCheckOut();
        setCalendarValue([]);
        getDisabledDates();
        document.getElementById("reservationForm").reset();
      })
      .then(() => {
        toast.success(`Block removed successfully`);
      })
      .catch(() => {
        toast.error("Not possible to block these dates, try again");
      });
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
          setCalendarValue([]);
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
        className={`CalendarElement__MainWrapper ${
          user && "loggedIn"
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
          tileDisabled={({ activeStartDate, date, view }) => {
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
          selectRange={true}
          locale={"en"}
          onChange={onDateSelect}
          value={calendarValue}
          minDate={new Date()}
          tileContent={({ activeStartDate, date, view }) =>
            view === "month" && (
              <p className="calendarPrice">
                {prices.filter(
                  (price) =>
                    Math.floor(
                      new Date(date.toLocaleDateString("en")).getTime() / 1000
                    ) >=
                      Math.floor(
                        new Date(
                          new Date(
                            date.getFullYear() + "-" + price.startDate
                          ).toLocaleDateString("en")
                        ).getTime() / 1000
                      ) &&
                    Math.floor(
                      new Date(date.toLocaleDateString("en")).getTime() / 1000
                    ) <=
                      Math.floor(
                        new Date(
                          new Date(
                            date.getFullYear() + "-" + price.endDate
                          ).toLocaleDateString("en")
                        ).getTime() / 1000
                      )
                )[0]?.price || "-"}
                €
              </p>
            )
          }
        />
      </div>
      <div className="blockedDatesContainer">
        {!loading &&
          user &&
          sortDisableDates().map((date) => (
            <div className="blockedDatesWrapper">
              <div className="blockedDate">
                <span>From:</span> {date.startDate}
              </div>
              <div className="blockedDate">
                <span>To:</span> {date.endDate}
              </div>
              <button
                onClick={() => removeBlock(date)}
                className="CalendarElement__BlockReservationButton"
              >
                Remove block
              </button>
            </div>
          ))}
      </div>
      <MoreDetails />
    </>
  );
}
