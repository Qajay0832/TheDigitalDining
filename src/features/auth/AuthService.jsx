import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/auth";

const login = async (userData) => {
  const res = await axios.post(`${API}/login`, userData);
  const token = res.data.token;
  const isAdmin = res.data.isAdmin;

  const payload = { ...userData, token,isAdmin };
  localStorage.setItem("user", JSON.stringify(payload));
  return payload;
};

const register = async (userData) => {
  await axios.post(`${API}/register`, userData);
  return login(userData);
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, register, logout };
