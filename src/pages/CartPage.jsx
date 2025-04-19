import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../features/order/orderSlice";
import { placeOrder } from "../features/order/orderSlice";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const handleOrder = () => {
    if (!user?.token) return alert("Login required");
    dispatch(placeOrder({ name, phone, cart, token: user.token }));
    dispatch(clearCart());
    alert("Order placed!");
  };

  return (
    <div>
      <h3>Your Cart</h3>
      {cart.map((item, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between border p-2 mb-2"
        >
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button
            onClick={() => dispatch(removeFromCart(item))}
            className="btn btn-sm btn-danger"
          >
            X
          </button>
        </div>
      ))}
      <h5>Total: ${total}</h5>

      <input
        className="form-control my-2"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control my-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}
