import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";                                                                                                                                                                    
import RiderDashboard from "./pages/RiderDashboard";
import HomePage from "./pages/HomePage";
import NavBar from "./pages/NavBar";
import CartPage from "./pages/CartPage";

const ProtectedRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem("role");
  if (!storedRole) return <Navigate to="/" />;
  if (role && storedRole !== role) return <Navigate to={`/${storedRole}`} />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/order-status" element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute role="customer">
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute role="customer">
            <CartPage />
          </ProtectedRoute>
        } />

        <Route path="/restaurant" element={
          <ProtectedRoute role="restaurant">
            <RestaurantDashboard />
          </ProtectedRoute>
        } />

        <Route path="/rider" element={
          <ProtectedRoute role="rider">
            <RiderDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}