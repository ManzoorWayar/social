import axios from "axios";

const API_URL = "/users";

const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);

  return data;
};

const verfication = async (verifyToken) => {
  const { data } = await axios.put(`${API_URL}/verification`, verifyToken);

  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData);

  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// Logout user
const logout = async (token) => {
  localStorage.removeItem("user");

  const { data } = await axios.get(`${API_URL}/logout`);

  return data;
};

const forgotPassword = async (email) => {
  const { data } = await axios.post(`${API_URL}/forgotPassword`, email);

  return data;
};

const resetPassword = async (pwdData) => {
  const { data } = await axios.put(
    `${API_URL}/resetpassword/${pwdData.resetToken}`,
    pwdData
  );

  return data;
};

const authService = {
  register,
  verfication,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

export default authService;
