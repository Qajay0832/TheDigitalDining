import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity, placeOrder } from "../../features/order/orderSlice";
import { useState } from "react";
import "./cartPage.css";
import { toast } from "react-toastify";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Total cost calculation considering the quantity of each item
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleOrder = () => {
    if (!user?.token) return toast.error("Login required");
    if (!name || !phone) return toast.error("Please enter both name and phone");

    dispatch(placeOrder({ name, phone, cart, token: user.token }));
    dispatch(clearCart());
    toast.success("Order placed!");
    setName("");
    setPhone("");
  };

  return (
    <div className="cartPageContainer">
      <h3 className="cartTitle">Your Cart</h3>
      {cart.map((item, idx) => (
        <div key={idx} className="cartItem">
          <div className="itemDetails">
            <span>{item.name}</span><br />
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className="itemActions">
            <div className="quantityControls">
              <button
                onClick={() => dispatch(decrementQuantity(item._id))}
                className="btn btn-sm btn-warning"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => dispatch(incrementQuantity(item._id))}
                className="btn btn-sm btn-info"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item._id))}
              className="btn btn-sm btn-danger ml-2"
            >
              X
            </button>
          </div>
        </div>
      ))}
      <h5 className="totalAmount">Total: ${total}</h5>

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
