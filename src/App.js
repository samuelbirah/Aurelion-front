import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthCallback from "@/components/AuthCallback";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import AdminLogin from "@/pages/AdminLogin";
import Admin from "@/pages/Admin";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminStats from "@/pages/AdminStats";
import "@/App.css";

function AppRouter() {
  const location = useLocation();
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
      <Route path="/admin/stats" element={<ProtectedRoute><AdminStats /></ProtectedRoute>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
