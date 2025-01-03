
import { ChatState } from "@/store/Context/UserContext";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const CheckAuth = ({children }) => {
  const {user} = ChatState()
  const location = useLocation();
  
     if (!user && !location.pathname.includes("/register")) {
       return <Navigate to="/auth/register" />;
     }

  if(user && location.pathname.includes("/register")){
    if( user && user.role === "admin"){
        return <Navigate to={"/admin/products"} />;
    }else{
        return <Navigate to={"/shop/home"}/>
    }
  }

    if(user && user.role !== "admin" && location.pathname.includes("/admin")){
        return <Navigate to={"/shop/home"}/>
    }
    if(user && user.role === "admin" && location.pathname.includes("/shop")){
        return <Navigate to={"/admin/products"} />;
    }
    
    if (user && user.role !== "admin" && location.pathname.includes("/shop")) {
       return children;
      }

    return <>
       {children}
    </>;
};

export default CheckAuth;
