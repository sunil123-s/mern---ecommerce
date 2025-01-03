import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChatState } from "@/store/Context/UserContext";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/Thunk/admin/Product";

const AdminPorductList = ({ product, seteditProduct, isOpen, setformdata }) => {
  const { user } = ChatState();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts(user));
        toast.success("Product Deleted");
      } else {
        toast.error("Try later");
      }
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <CardContent>
          <h2 className="tex-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-red-500"
                  : "text-green-500"
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            <span
              className={`${
                product.salePrice > 0 && "text-green-500"
              } text-lg font-bold`}
            >
              ${product?.salePrice}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              isOpen(true);
              seteditProduct(product._id);
              setformdata(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminPorductList;
