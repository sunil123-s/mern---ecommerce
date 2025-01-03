import { SheetContent, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import React from 'react'
import { Button } from '@/components/ui/button'
import CartItemsContent from './CartItems';
import { useNavigate } from 'react-router-dom';

const CartStructure = ({ cartItems, setopenCart,isLoading }) => {
  const navigate = useNavigate();

  const TotalAmmout = cartItems?.items?.reduce((total, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <SheetContent className="max-w-lg overflow-auto">
      <SheetHeader>
        <SheetTitle> Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item) => (
              <CartItemsContent key={item._id} cartItems={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${TotalAmmout?.toFixed(2)}</span>
        </div>
      </div>
      <Button
        className="w-full mt-6"
        onClick={() => {
          navigate("/shop/checkout")
          setopenCart(false)
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartStructure
