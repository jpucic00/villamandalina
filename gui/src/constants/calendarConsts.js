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

export const monthNames = [
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

export const nextMonthDays = (currentSelectedDate) => {
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
          <>
            <p className={`CalendarElement__Tuesday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusSixNumber}</p>
          </>
        );
      case "Tuesday":
        return (
          <>
            <p className={`CalendarElement__Wednesday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusFiveNumber}</p>
          </>
        );
      case "Wednesday":
        return (
          <>
            <p className={`CalendarElement__Thursday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusSixNumber}</p>
          </>
        );
      case "Thursday":
        return (
          <>
            <p className={`CalendarElement__Friday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusSixNumber}</p>
          </>
        );
      case "Friday":
        return (
          <>
            <p className={`CalendarElement__Saturday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Sunday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusSixNumber}</p>
          </>
        );
      case "Saturday":
        return (
          <>
            <p className={`CalendarElement__Sunday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Monday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusSixNumber}</p>
          </>
        );
      case "Sunday":
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{plusOneNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{plusTwoNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{plusThreeNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{plusFourNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{plusFiveNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{plusSixNumber}</p>
          </>
        );
    }
  };

  export const previousMonthDays = (daysLeftToRender,currentSelectedDate) => {
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
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 1);
        return null;
      case "Tuesday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 2);
        return <p className={`CalendarElement__Monday CE`}>{minusOneNumber}</p>;
      case "Wednesday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 3);
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusOneNumber}</p>
          </>
        );
      case "Thursday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 4);
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusOneNumber}</p>
          </>
        );
      case "Friday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 5);
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{minusOneNumber}</p>
          </>
        );
      case "Saturday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 6);
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{minusFiveNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>
              {minusThreeNumber}
            </p>
            <p className={`CalendarElement__Thursday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{minusOneNumber}</p>
          </>
        );
      case "Sunday":
        daysLeftToRender = 42 - (getDaysInMonth(currentSelectedDate) + 7);
        return (
          <>
            <p className={`CalendarElement__Monday CE`}>{minusSixNumber}</p>
            <p className={`CalendarElement__Tuesday CE`}>{minusFiveNumber}</p>
            <p className={`CalendarElement__Wednesday CE`}>{minusFourNumber}</p>
            <p className={`CalendarElement__Thursday CE`}>{minusThreeNumber}</p>
            <p className={`CalendarElement__Friday CE`}>{minusTwoNumber}</p>
            <p className={`CalendarElement__Saturday CE`}>{minusOneNumber}</p>
          </>
        );
      default:
        return null;
    }
  };