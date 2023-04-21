export const dateClickHandler = (day, month, year,setCheckInDate_Formatted,
    setCheckOutDate_Formatted,
    checkInDate_Formatted,
    checkOutDate_Formatted) => {
    setCheckInDate_Formatted(`${day} / ${month + 1} / ${year}`);
  };
