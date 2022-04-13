const errorHandler = (message) => {
  return message.split(":")[0] === "User validation failed"
    ? message.split(":")[2]
    : message;
};

export default errorHandler;
