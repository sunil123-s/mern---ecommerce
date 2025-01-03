import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("authToken"));
    if (userInfo) {
      setuser(userInfo);
    } else {
      navigate("/auth/register");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setuser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
