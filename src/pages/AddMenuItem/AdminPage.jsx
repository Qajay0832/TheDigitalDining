import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem } from "../../features/menu/menuSlice";
import "./adminPage.css";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !description || !price || !image) {
      toast.error("Every Field is required !");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    const token = user.token;
    // console.log({ formData, token });
    dispatch(addMenuItem({ formData, token }));
    toast.success("Item added");
  };

  return (
    <form onSubmit={handleSubmit} className="addMenuItemContainer">
      <h3>Add Menu Item</h3>
      <input
        className="form-control my-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="form-control my-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="maincourse">Main Course</option>
        <option value="starter">Starter</option>
        <option value="drinks">Drinks</option>
        <option value="sweets">Sweets</option>
      </select>
      <textarea
        className="form-control my-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="form-control my-2"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button className="btn btn-primary">Upload</button>
    </form>
  );
}
