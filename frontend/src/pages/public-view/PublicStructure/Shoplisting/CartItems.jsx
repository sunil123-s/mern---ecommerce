import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { deleteCart, updateCart } from '@/store/Thunk/Publics/CartThunk';
import { ChatState } from '@/store/Context/UserContext';
import toast from 'react-hot-toast';

const CartItemsContend = ({cartItems}) => {

  const {user} = ChatState()
  const dispatch = useDispatch();

  const handelCartDelete = (ItemId) => {
      dispatch(deleteCart({ user, productId:ItemId }))
      .then((data) => {
        if(data.payload.success){
          toast.success("Product Removed")
        }
      });
  }

  const handelquantity = (getcartItems, action) => {
    const quantityCheck =
      action === "plus" ? getcartItems.quantity + 1 : getcartItems.quantity - 1;
      if(action === "plus"){toast.success("item added")}
      else{toast.success("item removed")}

    dispatch(updateCart({user, productId:getcartItems?.productId, quantity:quantityCheck}))
    
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <img
          className="w-20 h-20 rounded object-cover"
          src={cartItems?.image}
          alt={cartItems?.title}
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItems?.title}</h3>
          <div className="flex items-center mt-1 gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 rounded-full"
              disabled={cartItems?.quantity === 1}
              onClick={() => handelquantity(cartItems, "minus")}
            >
              <Minus className="w-3 h-3 " />
              <span className="sr-only">Minus</span>
            </Button>
            <span className="font-semibold">{cartItems?.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3"
              onClick={() => handelquantity(cartItems, "plus")}
            >
              <Plus className="w-3 h-3 " />
              <span className="sr-only">Plus</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(cartItems?.salePrice > 0
              ? cartItems?.salePrice * cartItems?.quantity
              : cartItems?.price * cartItems?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handelCartDelete(cartItems?.productId)}
            className="cursor-pointer mt-1 w-5 h-5"
          />
        </div>
      </div>
    </>
  );
};

export default CartItemsContend;
