import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/order/orderSlice";
import "./orderHistoryPage.css";

export default function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(getOrders(user.phone));
  }, [user]);

  return (
    <div className="orderHistoryContainer">
      <h3 className="orderHistoryTitle">Your Orders</h3>
      {orders.length === 0 ? (
        <p className="noOrdersText">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="orderCard">
            <p className="orderId">
              <strong>Order #{order.id}</strong>
            </p>
            <div className="orderItems">
              {order.OrderItems?.map((item) => (
                <p key={item.id} className="orderItem">
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
