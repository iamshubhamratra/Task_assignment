async function sendResponse(
  res,
  resCode,
  status,
  message,
  data,
) {
  const template = {
    resCode: resCode,
    status: status,
    message: message,
    data: data,
  };

  return res.status(resCode).json(template);
}

module.exports = sendResponse;
