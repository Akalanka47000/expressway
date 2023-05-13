export const response = ({ res, status = 200, message, data }) => {
  const payload = {
    message,
    data
  };
  if (data) {
    delete payload.data;
  }
  return res.status(status).json(payload);
};
