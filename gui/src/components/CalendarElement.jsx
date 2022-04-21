import React, { useState } from "react";
import "../assets/style/CalendarElement.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  sub,
  add,
} from "date-fns";

import ArrowSVG from "./svgElements/ArrowSVG";

const CalendarElement = (props) => {
  const todayUnfiltered = new Date();

  const [currentSelectedDate, setCurrentSelectedDate] =
    useState(todayUnfiltered);

  const nextMonthDays = () => {
    const lastDayOfTheMonth = endOfMonth(currentSelectedDate);
    const nameOfLastDay = format(lastDayOfTheMonth, `EEEE`);

    const plusSix = add(lastDayOfTheMonth, { days: 6 });
    const plusSixNumber = format(plusSix, `d`);

    const plusFive = add(lastDayOfTheMonth, { days: 5 });
    const plusFiveNumber = format(plusFive, `d`);

    const plusFour = add(lastDayOfTheMonth, { days: 4 });
    const plusFourNumber = format(plusFour, `d`);

    const plusThree = add(lastDayOfTheMonth, { days: 3 });
    const plusThreeNumber = format(plusThree, `d`);

    const plusTwo = add(lastDayOfTheMonth, { days: 2 });
    const plusTwoNumber = format(plusTwo, `d`);

    const plusOne = add(lastDayOfTheMonth, { days: 1 });
    const plusOneNumber = format(plusOne, `d`);

    switch (nameOfLastDay) {
      case "Monday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Tuesday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
      case "Tuesday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Wednesday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusFiveNumber}</p>
          </React.Fragment>
        );
      case "Wednesday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Thursday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
      case "Thursday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Friday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
      case "Friday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Saturday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
      case "Snaturday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Sunday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
      case "Sunday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusSixNumber}</p>
          </React.Fragment>
        );
    }
  };

  const previousMonthDays = () => {
    const firstDayOfTheMonth = startOfMonth(currentSelectedDate);
    const nameOfFirstDay = format(firstDayOfTheMonth, `EEEE`);

    const minusSix = sub(firstDayOfTheMonth, { days: 6 });
    const minusSixNumber = format(minusSix, `d`);

    const minusFive = sub(firstDayOfTheMonth, { days: 5 });
    const minusFiveNumber = format(minusFive, `d`);

    const minusFour = sub(firstDayOfTheMonth, { days: 4 });
    const minusFourNumber = format(minusFour, `d`);

    const minusThree = sub(firstDayOfTheMonth, { days: 3 });
    const minusThreeNumber = format(minusThree, `d`);

    const minusTwo = sub(firstDayOfTheMonth, { days: 2 });
    const minusTwoNumber = format(minusTwo, `d`);

    const minusOne = sub(firstDayOfTheMonth, { days: 1 });
    const minusOneNumber = format(minusOne, `d`);

    switch (nameOfFirstDay) {
      case "Monday":
        return null;
      case "Tuesday":
        return <p className={`CalendarElement__Monday CE`}>{minusOneNumber}</p>;
      case "Wednesday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusOneNumber}</p>
          </React.Fragment>
        );
      case "Thursday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusOneNumber}</p>
          </React.Fragment>
        );
      case "Friday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{minusOneNumber}</p>
          </React.Fragment>
        );
      case "Saturday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{minusFiveNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>
              {minusThreeNumber}
            </p>
            <p className={`CalendarElement__Thursday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{minusOneNumber}</p>
          </React.Fragment>
        );
      case "Sunday":
        return (
          <React.Fragment>
            <p className={`CalendarElement__Monday CE`}>{minusSixNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusFiveNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{minusOneNumber}</p>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  previousMonthDays();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  return (
    <div className="CalendarElement__MainWrapper">
      <form className="CalendarElement__FormWrapper">
        <h1 className="CalendarElement__FormElementHeader">Calendar</h1>
        <label htmlFor="Check-In" className="TopMinusFive">
          Check-In Date
        </label>
        <input
          type="date"
          id="Check-In"
          className="CalendarElement__Date_Input"
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
          {previousMonthDays()}
          {monthRange.map((day) => {
            const dayString = format(day, `EEEE`);
            const dayNumber = format(day, `d`);

            return (
              <p className={`CalendarElement__${dayString}`}>{dayNumber}</p>
            );
          })}
          {nextMonthDays()}
        </div>
      </div>
    </div>
  );
};

export default CalendarElement;
