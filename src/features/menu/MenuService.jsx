import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/menu";

const getMenu = async () => {
  const res = await axios.get(API);
  return res.data;
};

const addMenuItem = async (menudata) => {
  console.log("formData", menudata.formData, "token", menudata.token);
  const menuitem=menudata.formData

  const res = await axios.post(
    API,
    menuitem,
    {
      headers: {
        Authorization: `Bearer ${menudata.token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export default { getMenu, addMenuItem };
