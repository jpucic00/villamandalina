import React, { useState } from "react";
import CalendarElement from "../components/CalendarElement";
import Calendar from "react-calendar";
import "../assets/style/reactCalendar.css";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

export default function CalendarComp() {
  const { width } = useWindowDimensions();

  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();

  const [disabledDates, setDisabledDates] = useState([
    { startDate: "2023-04-22", endDate: "2023-04-23" },
    { startDate: "2023-04-23", endDate: "2023-04-25" },
    { startDate: "2023-04-25", endDate: "2023-04-28" },
  ]);

  const formatDate = (e) => {
    const offset = e.getTimezoneOffset();
    let date = new Date(e.getTime() - offset * 60 * 1000);
    return (date = date.toISOString().split("T")[0]);
  };

  const onDateSelect = (e) => {
    console.log(e);
    setCheckIn(formatDate(e[0]));

    setCheckOut(formatDate(e[1]));
  };

  const submitReservation = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    alert(e);
  };

  return (
    <>
      <h1 className="calendarPageTitle">Calendar</h1>
      <div className={`CalendarElement__MainWrapper ${deviceCheck(width)}`}>
        <form
          onSubmit={submitReservation}
          className="CalendarElement__FormWrapper"
        >
          <label htmlFor="Check-In" className="TopMinusFive">
            Select Check-Out Date
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
          minDate={new Date()}
        />
      </div>
    </>
  );
}
