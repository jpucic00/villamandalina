import React, { useState, useRef } from "react";
import "../assets/style/CalendarElement.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  addDays,
  sub,
  add,
  getDaysInMonth,
} from "date-fns";
import { dateClickHandler } from "../util/calendarDateHandler";

import ArrowSVG from "./svgElements/ArrowSVG";

import { monthNames, previousMonthDays } from "../constants/calendarConsts";

const CalendarElement = (props) => {
  const todayUnfiltered = new Date();

  const [currentSelectedDate, setCurrentSelectedDate] =
    useState(todayUnfiltered);

  const [checkInDate_Formatted, setCheckInDate_Formatted] = useState();
  const [checkOutDate_Formatted, setCheckOutDate_Formatted] = useState();

  let daysLeftToRender = 0;

  const nextMonth = addMonths(currentSelectedDate, 1);

  const prevMonthSelectorHandler = () => {
    setCurrentSelectedDate((prevState) => {
      return addMonths(prevState, -1);
    });
  };

  const nextMonthSelectorHandler = () => {
    setCurrentSelectedDate((prevState) => {
      return addMonths(prevState, 1);
    });
  };

  const monthRange = eachDayOfInterval({
    start: startOfMonth(currentSelectedDate),
    end: endOfMonth(currentSelectedDate),
  });

  const nextMonthRange = () => {
    return eachDayOfInterval({
      start: startOfMonth(nextMonth),
      end: addDays(startOfMonth(nextMonth), daysLeftToRender),
    });
  };

  return (
    <div className="CalendarElement__MainWrapper">
      <form className="CalendarElement__FormWrapper">
        <h1 className="CalendarElement__FormElementHeader">Calendar</h1>
        <label htmlFor="Check-In" className="TopMinusFive">
          Check-In Date
        </label>
        <input
          type="text"
          value={checkInDate_Formatted}
          id="Check-In"
          className="CalendarElement__Date_Input"
          readOnly
        />
        <label htmlFor="Check-Out" className="TopMinusFive">
          Check-Out Date
        </label>
        <input
          type="date"
          id="Check-Out"
          className="CalendarElement__Date_Input"
        />
        <label htmlFor="Name" className="TopMinusFive">
          Name
        </label>
        <input type="text" id="Name" className="CalendarElement__Text_Input" />
        <label htmlFor="Email" className="TopMinusFive">
          Email
        </label>
        <input type="text" id="Email" className="CalendarElement__Text_Input" />
        <label htmlFor="ContactNumber" className="TopMinusFive">
          Contact Number
        </label>
        <input
          type="number"
          id="ContactNumber"
          className="CalendarElement__Text_Input"
        />
        <button className="CalendarElement__MakeReservationButton">
          Make a Reservation
        </button>
        <button className="CalendarElement__ContactUsButton">Contact Us</button>
      </form>
      <div className="CalendarElement__DatePickerWrapper">
        <h1 className="CalendarElement__Year">
          {currentSelectedDate.getFullYear()}
        </h1>
        <h2 className="CalendarElement__MonthWrapper">
          <ArrowSVG direction="left" onClick={prevMonthSelectorHandler} />
          {monthNames[currentSelectedDate.getMonth()]}
          <ArrowSVG direction="right" onClick={nextMonthSelectorHandler} />
        </h2>

        <div className="CalendarElement__DateWrapper">
          <p className="CalendarElement__DayOfTheWeek">Mon</p>
          <p className="CalendarElement__DayOfTheWeek">Tue</p>
          <p className="CalendarElement__DayOfTheWeek">Wen</p>
          <p className="CalendarElement__DayOfTheWeek">Thu</p>
          <p className="CalendarElement__DayOfTheWeek">Fri</p>
          <p className="CalendarElement__DayOfTheWeek">Sat</p>
          <p className="CalendarElement__DayOfTheWeek">Sun</p>
          <div className="CalendarElement__DividerLine"></div>
          {previousMonthDays(daysLeftToRender, currentSelectedDate)}
          {monthRange.map((day) => {
            const dayString = format(day, `EEEE`);
            const dayNumber = format(day, `d`);

            return (
              <p
                className={`CalendarElement__${dayString}`}
                onClick={() => {
                  dateClickHandler(
                    dayNumber,
                    currentSelectedDate.getMonth(),
                    currentSelectedDate.getFullYear(),
                    setCheckInDate_Formatted,
                    setCheckOutDate_Formatted,
                    checkInDate_Formatted,
                    checkOutDate_Formatted
                  );
                }}
              >
                {dayNumber}
              </p>
            );
          })}
          {nextMonthRange().map((day) => {
            const dayString = format(day, `EEEE`);
            const dayNumber = format(day, `d`);

            return (
              <p
                className={`CalendarElement__${dayString} CE`}
                onClick={() => {
                  dateClickHandler(
                    dayNumber,
                    nextMonth.getMonth(),
                    nextMonth.getFullYear()
                  );
                }}
              >
                {dayNumber}
              </p>
            );
          })}
          {/* {nextMonthDays()} */}
        </div>
      </div>
    </div>
  );
};

export default CalendarElement;
