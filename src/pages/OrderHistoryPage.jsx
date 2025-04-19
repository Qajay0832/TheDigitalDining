import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";

export default function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(getOrders(user.phone));
  }, [user]);

  return (
    <div>
      <h3>Your Orders</h3>
      {orders.map((order) => (
        <div key={order.id} className="border p-3 mb-2">
          <p>
            <strong>Order #{order.id}</strong>
          </p>
          {order.OrderItems?.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
