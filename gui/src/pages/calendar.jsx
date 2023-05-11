import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../assets/style/reactCalendar.css";
import "../assets/style/CalendarElement.css";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { ref, get, set, remove } from "firebase/database";
import emailjs from "@emailjs/browser";

export default function CalendarComp() {
  const { width } = useWindowDimensions();
  const [user, loading] = useAuthState(auth);

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [calendarValue, setCalendarValue] = useState([]);

  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    getDisabledDates();
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

  const sortDisableDates = () => {
    return disabledDates.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.startDate) - new Date(a.startDate);
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

  const submitBlock = (e) => {
    e.preventDefault();
    set(ref(db, `/bookedDates/${disabledDates.length + 1}`), {
      startDate: `${checkIn}`,
      endDate: `${checkOut}`,
    })
      .then(() => {
        setCheckIn("");
        setCheckOut("");
        setCalendarValue([]);
        getDisabledDates();
      })
      .catch(() => {
        toast.error("Not possible to block these dates, try again");
      });
  };
  const removeBlock = (e) => {
    remove(ref(db, `/bookedDates/${e.key}`))
      .then(() => {
        setCheckIn("");
        setCheckOut("");
        setCalendarValue([]);
        getDisabledDates();
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
          setCheckIn("");
          setCheckOut("");
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
      <ToastContainer />
      <h1 className="calendarPageTitle">Calendar</h1>
      <div className={`CalendarElement__MainWrapper ${deviceCheck(width)}`}>
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
                type="date"
                id="Check-In"
                disabled
                value={checkIn && checkIn}
                className="CalendarElement__Date_Input"
                readOnly
              />
              <label htmlFor="Check-Out" className="TopMinusFive">
                Select Check-Out Date
              </label>
              <input
                required
                type="date"
                disabled
                value={checkOut && checkOut}
                id="Check-Out"
                className="CalendarElement__Date_Input"
                readOnly
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
                type="text"
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
              <button
                type="button"
                className="CalendarElement__ContactUsButton calendarButton"
              >
                Contact Us
              </button>
            </>
          ) : (
            <>
              <label htmlFor="Check-In" className="TopMinusFive">
                Select Check-In Date
              </label>
              <input
                required
                type="date"
                id="Check-In"
                disabled
                value={checkIn && checkIn}
                className="CalendarElement__Date_Input"
                readOnly
              />
              <label htmlFor="Check-Out" className="TopMinusFive">
                Select Check-Out Date
              </label>
              <input
                required
                type="date"
                disabled
                value={checkOut && checkOut}
                id="Check-Out"
                className="CalendarElement__Date_Input"
                readOnly
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
          tileDisabled={({ activeStartDate, date, view }) =>
            disabledDates.filter(
              (disabledDate) =>
                date.toLocaleDateString(
                  window.navigator.userLanguage || window.navigator.language
                ) >
                  new Date(disabledDate.startDate).toLocaleDateString(
                    window.navigator.userLanguage || window.navigator.language
                  ) &&
                date.toLocaleDateString(
                  window.navigator.userLanguage || window.navigator.language
                ) <
                  new Date(disabledDate.endDate).toLocaleDateString(
                    window.navigator.userLanguage || window.navigator.language
                  )
            ).length > 0 ||
            disabledDates.filter(
              (disabledDate) =>
                date.toLocaleDateString(
                  window.navigator.userLanguage || window.navigator.language
                ) >=
                  new Date(disabledDate.startDate).toLocaleDateString(
                    window.navigator.userLanguage || window.navigator.language
                  ) &&
                date.toLocaleDateString(
                  window.navigator.userLanguage || window.navigator.language
                ) <=
                  new Date(disabledDate.endDate).toLocaleDateString(
                    window.navigator.userLanguage || window.navigator.language
                  )
            ).length > 1
          }
          selectRange={true}
          locale={window.navigator.userLanguage || window.navigator.language}
          onChange={onDateSelect}
          value={calendarValue}
          minDate={new Date()}
        />
      </div>
      <div className="blockedDatesContainer">
        {!loading &&
          user &&
          sortDisableDates().map((date) => (
            <div className="blockedDatesWrapper">
              <div className="blockedDate">From: {date.startDate}</div>
              <div className="blockedDate">To: {date.endDate}</div>
              <button
                onClick={() => removeBlock(date)}
                className="CalendarElement__MakeReservationButton"
              >
                Remove block
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
