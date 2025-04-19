import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../features/menu/menuSlice";
import { addToCart } from "../features/order/orderSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <div>
      <h3>Menu</h3>
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <strong>${item.price}</strong>
                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
