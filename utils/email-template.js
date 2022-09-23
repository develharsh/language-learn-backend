module.exports.visitor = (message) => {
  return {
    subject: `Visit Alert - Languate`,
    body: `Visit Alert Type: ${message}`,
  };
};

module.exports.event = (message) => {
  return {
    subject: `Event Alert - Languate`,
    body: `Event Alert Type: ${message}`,
  };
};
