module.exports.courseIdsEnum = ["ENGLISH"];

module.exports.isPhone = (payload) => {
  if (payload.match(/^\d{10}$/)) return true;
  return false;
};

module.exports.isEmail = (payload) => {
  if (payload.match(/\S+@\S+\.\S+/)) return true;
  return false;
};
