// utils/formatDate.js
import moment from "moment";

export const formatDate = (dateString) => {
  return moment(dateString).format("DD MMM, YYYY"); // e.g., "19 Jul, 2025"
};
