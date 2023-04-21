import axios from "axios";
import { shipWayApiUrl, backendUrl } from "../index";
import { shipWayCredential } from "./Constants";

export const getDeliveryStatus = async (orderId) => {
  const bodyData = {
    username: shipWayCredential.username,
    password: shipWayCredential.password,
    order_id: orderId,
  };
  try {
    return axios.post(`${shipWayApiUrl}/getOrderShipmentDetails`, bodyData);
  } catch (e) {
    console.log(e);
    return { data: { status: "Failed", response: "Something went wrong" } };
  }
};

export const getCarriers = async () => {
  try {
    return axios.get(`${shipWayApiUrl}/carriers`);
  } catch (e) {
    console.log(e);
    return { data: { status: "Failed", response: "Something went wrong" } };
  }
};

export const getProducts = () => {
  const token = localStorage.getItem("userToken");

  try {
    return axios.get(`${backendUrl}/get/products`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getTrackProducts = () => {
  const token = localStorage.getItem("userToken");

  try {
    return axios.get(`${backendUrl}/get/trackProducts`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postProduct = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/product`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const updateProduct = (data) => {
  try {
    return axios.put(`${backendUrl}/update/product`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const deleteProduct = (id) => {
  try {
    return axios.delete(`${backendUrl}/delete/product`, { data: { id } });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const loginUser = (data) => {
  try {
    return axios.post(`${backendUrl}/post/login`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const verifyUser = (token) => {
  try {
    return axios.post(
      `${backendUrl}/post/verifyToken`,
      {},
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getUsers = () => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.get(`${backendUrl}/get/users`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postUser = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/user`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const updateUser = (data) => {
  try {
    return axios.put(`${backendUrl}/update/user`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const deleteUser = (id) => {
  try {
    return axios.delete(`${backendUrl}/delete/user`, { data: { id } });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getExpenses = () => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.get(`${backendUrl}/get/expenses`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postExpense = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/expense`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const updateExpense = (data) => {
  try {
    return axios.put(`${backendUrl}/update/expense`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const deleteExpense = (id) => {
  try {
    return axios.delete(`${backendUrl}/delete/expense`, { data: { id } });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postOrder = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/order`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const updateOrder = (data) => {
  try {
    return axios.put(`${backendUrl}/update/order`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const moveToReplacement = (id) => {
  try {
    return axios.put(`${backendUrl}/update/moveToReplacement`, { id });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getOrders = () => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.get(`${backendUrl}/get/orders`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getOrder = (id) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.get(`${backendUrl}/get/order?id=${id}`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const deleteOrder = (id) => {
  try {
    return axios.delete(`${backendUrl}/delete/order`, { data: { id } });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const updateReplacement = (data) => {
  try {
    return axios.put(`${backendUrl}/update/replacement`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getVendors = async () => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.get(`${backendUrl}/get/vendors`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getPurchaseItem = async () => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.get(`${backendUrl}/get/purchaseItems`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

// export const getVendorCredits = async () => {
//     try {
//         const token = localStorage.getItem('userToken')
//         return await axios.get(`${backendUrl}/get/vendorCredit`, { headers: { userToken: token } });
//     } catch (e) {
//         console.log(e)
//         return { data: { status: "error", response: "Something went wrong" } }
//     }
// }

export const getVendorCredits = () => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.get(`${backendUrl}/get/vendorCredit`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const getBills = async () => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.get(`${backendUrl}/get/bills`, {
      headers: { userToken: token },
    });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postVendor = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/vendor`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const postPuschaseItem = (data) => {
  const token = localStorage.getItem("userToken");
  try {
    return axios.post(
      `${backendUrl}/post/addPurchaseItem`,
      { data },
      { headers: { userToken: token } }
    );
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const payupdate = (data, _id) => {
  try {
    return axios.put(`${backendUrl}/update/vendorCredit/${_id}`, { data });
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const deleteVendorCredit = (id) => {
  try {
    return axios.delete(`${backendUrl}/delete/removePurchaseItem/${id}`);
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};

export const purchaseOrder = (data) => {
  try {
    return axios.post(`${backendUrl}/post/purchaseReport`, data);
  } catch (e) {
    console.log(e);
    return { data: { status: "error", response: "Something went wrong" } };
  }
};
