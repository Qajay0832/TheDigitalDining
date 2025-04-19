import axios from "axios";
const API = import.meta.env.VITE_API_URL + "/orders";

const placeOrder = async ({ name, phone, cart, token }) => {
  const res = await axios.post(
    API,
    {
      name,
      phone,
      items: cart,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

const getOrders = async (phone) => {
  const res = await axios.get(`${API}/${phone}`);
  return res.data;
};

export default { placeOrder, getOrders };
