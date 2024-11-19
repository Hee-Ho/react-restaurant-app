const getPrice = (num) => {
  return (num / 100).toFixed(2);
};

const setPrice = (num) => {
  return (num * 100).toFixed(0);
};

const getItemStatus = (bol) => {
  if (bol) {
    return "Available";
  } else {
    return "Sold out";
  }
};

const setAvailibility = (num) => {
  if (num < 1) {
    return false;
  }
  return true;
};

module.exports = {
  getPrice,
  setPrice,
  getItemStatus,
  setAvailibility,
};
