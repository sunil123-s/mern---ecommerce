
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {
  const [isSignup, setisSignup] = useState(true)
  const [formdata, setformdata] = useState({
    email:"",
    name:"",
    password:"",
  })
   
  const navigate = useNavigate()

  const formTitle = isSignup ? "Create new account" : "Sign In to Your account";
  const formbutton = isSignup ? "Sign Up" : "login";
  const formLink = isSignup ? "login" : "create"
  const formcontext = isSignup ? 'Already have an account?' : 'Need an account?'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionUrl = isSignup
      ? `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/signup`
      : `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/login`;
    try {
      const res = await axios.post(
        actionUrl,
        formdata,
      );
      localStorage.setItem("authToken", JSON.stringify(res.data.user))
      navigate("/shop/home")
      toast.success("Register successfully")
    } catch(error) {  
      toast.error(error.response.data)
      console.error("Error during registration:",error);
    }
  };
  
  const handelSignupPage = () => {
    setisSignup(!isSignup)
  }
  
  const handelchange = (e) => {
    setformdata({
      ...formdata, [e.target.id] :e.target.value
    })
  }
  return (
    <>
      <div className="max-w-[500px] w-full mx-auto mt-10 space-y-2">
        <form className="space-y-4 text-2xl" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-center ">{formTitle}</h2>
          <div>
            <Input
              className="h-12 font-semibold"
              id="email"
              type="email"
              value={formdata.email}
              placeholder="Email"
              onChange={handelchange}
              required
            />
          </div>
          {!isSignup ? (
            ""
          ) : (
            <div>
              <Input
                className="h-12"
                id="name"
                type="text"
                value={formdata.name}
                placeholder="Name"
                onChange={handelchange}
                required
              />
            </div>
          )}
          <div>
            <Input
              className="h-12"
              id="password"
              type="password"
              value={formdata.password}
              placeholder="password"
              onChange={handelchange}
              required
            />
          </div>
          <Button type="submit" className="w-full h-12">
            {formbutton}
          </Button>
        </form>
        <div className="text-center">
          <h5>
            {formcontext}{" "}
            <span
              className="text-blue-900 font-semibold cursor-pointer"
              onClick={handelSignupPage}
            >
              {formLink}
            </span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
