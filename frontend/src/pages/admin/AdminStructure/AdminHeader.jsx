import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatState } from "@/store/Context/UserContext";

const AdminHeader = ({setopen}) => {
   const { setuser } = ChatState();
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setuser(null);
  }

  return (
    <header className="flex items-center justify-center px-4 py-3 bg-background boder-b">
      <Button className="lg:hidden sm:block" onClick={() => setopen(true)}>
        <Menu />
        <span className="sr-only">Toggle Button</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="items-center rounded-md" onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader
