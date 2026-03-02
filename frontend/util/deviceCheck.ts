const deviceCheck = (width: number): string | false => {
  if (width < 700) {
    return "mobile";
  } else if (width < 1350) {
    return "tablet";
  } else {
    return false;
  }
};

export default deviceCheck;
