import React from 'react'
import { PackageSearch, ClockArrowDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AdminMenuItem = [
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <PackageSearch />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ClockArrowDown />,
  },
];

const AdminMenuSidbar = ({setopen}) => {
    const navigate = useNavigate()
  return (
    <nav className='mt-8 flex-col flex gap-2'>
      {AdminMenuItem.map((Menu) => (
        <div
          key={Menu.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground text-xl"
          onClick={() => 
            {navigate(Menu.path) 
             setopen ? setopen(false) : null   
            } }
        >
          {Menu?.icon}
          <span>{Menu?.label}</span>
        </div>
      ))}
    </nav>
  )
}

export default AdminMenuSidbar
