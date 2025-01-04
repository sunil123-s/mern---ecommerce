import { LogOut, ShoppingCart, UserCog } from 'lucide-react'
import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar,AvatarFallback } from '@/components/ui/avatar'
import { ChatState } from '@/store/Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Sheet } from '@/components/ui/sheet'
import CartStructure from './CartStructure'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '@/store/Thunk/Publics/CartThunk'

const HeaderRight = () => {
  const [openCart, setopenCart] = useState(false)
  const { user, setuser } = ChatState();

  const dispatch = useDispatch()
  const { cartItems, isLoading } = useSelector((state) => state.Cart);
  
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setuser(null)
  }

  useEffect(() => {
    dispatch(fetchCartItems(user))
  }, [dispatch])
  

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCart} onOpenChange={() => setopenCart(false)}>
        <Button onClick={() => setopenCart(true)} variant="outline" size="icon" className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-2px] right-[2px] font-bold text-sm text-red-700">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">user cart</span>
        </Button>
        <CartStructure
          cartItems={cartItems && cartItems.items ? cartItems : []}
          isLoading={isLoading}
          setopenCart={setopenCart}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="font-extrabold">
              {user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged In as {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog className="w-4 h-4 mr-2" />
            account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderRight
