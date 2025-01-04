import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar,AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import { ChatState } from "@/store/Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AddtoCart,fetchCartItems } from "@/store/Thunk/Publics/CartThunk";
import toast from "react-hot-toast";  
import { setproductDetails } from "@/store/Slices/Public-slice/publicProductSlice";
import { AddReview, fetchReview } from "@/store/Thunk/Publics/ReviewThunk";

const ProductDetialDailog = ({open,setopen,productDetails}) => {
     const [reviewMessage, setreviewMessage] = useState("");
     const {user} = ChatState()
     const dispatch = useDispatch()

     const { productReview } = useSelector((state) => state.review);

     const handelCartId = (CartItemId) => {
       dispatch(
         AddtoCart({user, productId:CartItemId, quantity: 1 })
       ).then((data) => {
         if (data.payload.success) {
           dispatch(fetchCartItems(user));
           toast.success("Product Add To Cart");
         }
       });  
     };

    const handelclose = () => {
      setopen(false)
      dispatch(setproductDetails())
    }
    
    const handelReview = (productId ) => {
        dispatch(
          AddReview({productId,userId: user?.id,name: user?.name,reviewMessage,}))
          .then((data) => {
          if(data.payload.success){
            toast.success("Thanks for review")
            dispatch(fetchReview(productId));
            setreviewMessage("")
          }
        });
    }    

    useEffect(() => {
      if(productDetails?._id){
        dispatch(fetchReview({productId:productDetails?._id, user}))
      }
    }, [dispatch, productDetails?._id])
    
    
  return (
    <>
      <Dialog open={open} onOpenChange={handelclose}>
        <DialogContent className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 gap-8 p-12 sm:p-12 max-w-[90vw] lg:max-w-[70vw] max-h-[80vh] overflow-auto">
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="aspect-square w-full sm:w-auto object-contain"
              width={600}
              height={600}
              src={productDetails?.image}
              alt={productDetails?.title}
            />
          </div>
          <div className="">
            <div>
              <h1 className="text-4xl font-extrabold">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground text-2xl my-4">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5 mb-1">
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`${productDetails?.salePrice > 0 ? "line-through text-red-500 text-2xl" : "text-green-500 text-3xl"}  font-bold text-primary`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-green-500 text-3xl font-bold">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="mt-5 mb-5">
              <Button
                className="w-full"
                onClick={() => handelCartId(productDetails)}
              >
                Add To Cart
              </Button>
            </div>
            <Separator />
            <div className="max-h-[300px]">
              <h2 className="text-3xl font-bold mb-4">Reviews</h2>
              <div className="overflow-auto max-h-[150px] sm:max-h-[150px]">
                {productReview?.length > 0 ? (
                  productReview.map((review) => (
                    <>
                      <div
                        className="flex gap-4 mb-4 items-center"
                        key={review?._id}
                      >
                        <Avatar className="w-10 h-10 border">
                          <AvatarFallback>
                            {review?.name?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <div className="flex flex-col">
                            <h3 className="font-bold">{review?.name}</h3>
                            <p className="text-muted-foreground">
                              {review?.reviewMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
              <div className="mt-6 flex gap-4 mb-2 flex-col sm:flex-row ">
                <Input
                  className="flex-1"
                  placeholder="Write a Review..."
                  value={reviewMessage}
                  onChange={(e) => setreviewMessage(e.target.value)}
                />
                <Button
                  className="sm:w-auto w-full"
                  onClick={() => handelReview(productDetails?._id)}
                >
                  submit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductDetialDailog
