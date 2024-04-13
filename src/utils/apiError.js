import toastHot from "react-hot-toast";

export const apiSuccess = (message) => {
  return toastHot.success(message, {
    duration: 5000,
  });
};

export const customError = (msg) => {
  return toastHot.error(msg, {
    duration: 5000,
  });
};
export const apiError = (error) => {
  return toastHot.error(error?.response?.data?.message || error?.message, {
    duration: 5000,
  });
};
