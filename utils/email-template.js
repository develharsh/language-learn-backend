module.exports.visitor = (message) => {
  return {
    subject: `Visit Alert - SpeakLikePro`,
    body: `Visit Alert Type: ${message}`,
  };
};

module.exports.event = (message) => {
  return {
    subject: `Event Alert - SpeakLikePro`,
    body: `Event Alert Type: ${message}`,
  };
};
