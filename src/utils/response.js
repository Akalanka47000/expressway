export const response = ({ res, status = 200, message, data }) => {
  const payload = {
    data,
    message
  };
  return res.status(status).json(payload);
};
