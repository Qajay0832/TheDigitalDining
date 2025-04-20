import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderHistoryPage from "./pages/OrderHistory/OrderHistoryPage";
import AdminPage from "./pages/AddMenuItem/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Todo:-categories , select tag in admin adding,filter in menu with items
//Endpoints for adding/editing menu items adding h edit bhi dikhana okay or delete bhi daal dena
// Netlify.

//How you approached the tasks, tackled potential issues, and justified design decisions (especially the DB choice).

const App = () => (
  <Router>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Navbar />
    {/* <LoginPage/> */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
