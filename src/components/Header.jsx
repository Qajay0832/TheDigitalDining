import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        Digital Diner
      </Link>
      <div className="navbar-nav">
        <Link to="/" className="nav-link">
          Menu
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
        {user ? (
          <>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <button
              className="btn btn-link nav-link"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
            {user.isAdmin && (
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
