const getTempCategory = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp <= 85) {
    return "warm";
  } else if (temp <= 65) {
    return "cold";
  } else {
    return "hot";
  }
};

export default getTempCategory;
