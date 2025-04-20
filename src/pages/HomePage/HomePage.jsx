import React, { useEffect, useState } from "react";
import MenuImg from "../../assets/Screenshot 2023-07-14 at 11.14 1.jpg";
import "./homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../../features/menu/menuSlice";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../features/order/orderSlice";
import AddToCartImg from "../../assets/plus.jpg";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.menu);
  const { cart } = useSelector((state) => state.order);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  const filteredItems = items.filter((item) => {
    const matchCategory = category === "all" || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="menuContainer">
      <img className="menuImage" src={MenuImg} alt="Menu" />
      <div>
        <p className="menuHeading">Menu</p>

        <div className="menu-controls">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All</option>
            <option value="starter">Starter</option>
            <option value="maincourse">Main Course</option>
            <option value="sweets">Sweets</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div className="menu">
          {filteredItems.map((item) => (
            <div className="card" key={item._id}>
              <img src={item.imageUrl} alt={item.name} className="card-main-img" />
              <div className="card-content">
                <div className="card-start-content">
                  <p className="food-name">{item.name}</p>
                  <p>{item.description}</p>
                  <p className="cost">${item.price}/-</p>
                </div>
                <div className="card-end-content">
                  {getItemQuantity(item._id) === 0 ? (
                    <img
                      src={AddToCartImg}
                      alt="Add To Cart"
                      onClick={() => dispatch(addToCart(item))}
                      className="add-to-cart-img"
                    />
                  ) : (
                    <div className="quantity-control">
                      <button onClick={() => dispatch(decrementQuantity(item._id))}>-</button>
                      <span>{getItemQuantity(item._id)}</span>
                      <button onClick={() => dispatch(incrementQuantity(item._id))}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && <p className="no-items">No items found.</p>}
      </div>
    </div>
  );
};

export default HomePage;
