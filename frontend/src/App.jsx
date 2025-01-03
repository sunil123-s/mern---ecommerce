import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import RegisterPage from "./pages/auth/RegisterForm/RegisterPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Products from "./pages/admin/admin-View/Products";
import Orders from "./pages/admin/admin-View/AdminOrders";
import PublicLayout from "./pages/public-view/PublicLayout";
import PageNotFond from "./pages/notFound/PageNotFond";
import Home from "./pages/public-view/UserView/Home";
import Account from "./pages/public-view/Accounts/Account";
import Listing from "./pages/public-view/PorductListing/Listing";
import CheckOut from "./pages/public-view/UserView/CheckOut";
import CheckAuth from "./pages/common/CheckAuth";
import NotAllowed from "./pages/notFound/NotAllowed";
import { Navigate } from "react-router-dom";

function App() {
    
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/register"/>}/>
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth>
              <PublicLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
        <Route path="notallowed" element={<NotAllowed />} />
        <Route path="*" element={<PageNotFond />} />
      </Routes>
    </div>
  );
}

export default App
