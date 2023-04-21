import { getDeliveryStatus } from "./AxiosHelper";
import { Colors } from "./Colors";
import moment from "moment";
import { v4 } from "uuid";

export const getFilteredResponds = (obj) => {
  if (!obj.isReplacement && obj.awbNumber) {
    return getDeliveryStatus(obj.orderId).then((response) => {
      return { ...obj, shipWayRes: response.data };
    });
  } else if (obj.replacementOrderId && obj.replacementAwbNumber) {
    return getDeliveryStatus(obj.replacementOrderId).then((response) => {
      return { ...obj, shipWayRes: response.data };
    });
  } else {
    return obj;
  }
};

export const getDeliveryColorCode = (status) => {
  switch (status) {
    case "DEL":
      return Colors.success;
    case "PKP":
    case "INT":
      return Colors.blue;
    case "NFI":
    case "OOD":
      return Colors.yellow;
    case "24":
      return Colors.danger;
    case "RTO":
      return Colors.orange;
    default:
      return Colors.primary;
  }
};

export const getOrderId = (orders, orderedDate) => {
  const filteredOrders = orders.filter((order) => {
    const createdAt = moment(order.orderedDate);
    const startOfToday = moment().startOf("day");
    const endOfToday = moment().endOf("day");
    return createdAt.isBetween(startOfToday, endOfToday);
  });
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const today = new Date(orderedDate);

  const todayDate = today.getDate().toString().padStart(2, "0");

  const uuid = v4;

  // return monthNames[today.getMonth()] + today.getFullYear() + todayDate + (filteredOrders.length + 1).toString().padStart(2, "0")
  return (
    monthNames[today.getMonth()] +
    today.getFullYear() +
    todayDate +
    "-" +
    uuid().replace(/-/g, "").slice(0, 8)
  );
};

export const getGstPrice = (gst, total) => {
  return parseInt((total / 100) * gst).toFixed(0);
};
