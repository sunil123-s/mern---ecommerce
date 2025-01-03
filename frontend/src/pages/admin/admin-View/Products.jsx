import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import CommonForm from "@/pages/common/CommonForm";
import { addProductsdata } from "@/utils/DummyData/AddProductsData";
import ImageUpLoad from "./ImageUpLoad";
import toast from "react-hot-toast";
import { ChatState } from "@/store/Context/UserContext";
import AdminPorductList from "./AdminPorductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  addPorduct,
  updateProduct,
} from "@/store/Thunk/admin/Product";

const initalFormdata = {
  image: "",
  title: "",
  description: "",
  category: "",
  price: "",
  brand: "",
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [formdata, setformdata] = useState(initalFormdata);
  const [createProducts, setcreateProducts] = useState(false);
  const [imageFile, setimageFile] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [editProduct, seteditProduct] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProduct);

  const { user } = ChatState();
  const id = formdata?._id;

  const onSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      if (editProduct !== null) {
        dispatch(updateProduct({ formdata, id, user })).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAllProducts(user));
            toast.success("Updated Product");
            setcreateProducts(false);
            setformdata(initalFormdata);
          } else {
            toast.error("Try to update later");
          }
        });
      } else {
        dispatch(addPorduct({ ...formdata, image: uploadImg }, user)).then(
          (data) => {
            if (data.payload.success) {
              dispatch(fetchAllProducts(user));
              toast.success("Product added successfully!");
              setcreateProducts(false);
              setimageFile("");
              setformdata(initalFormdata);
            } else {
              toast.error("Try Add Porduct Later");
            }
          }
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts(user));
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setcreateProducts(true)}>Add New Button</Button>
      </div>
      <div className="grid gap-4 md:grid-col-3 lg:grid-cols-4">
        {products?.length > 0 ? (
          products.map((singleProduct) => (
            <AdminPorductList
              key={singleProduct._id}
              product={singleProduct}
              isOpen={setcreateProducts}
              seteditProduct={seteditProduct}
              setformdata={setformdata}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <Sheet
        open={createProducts}
        onOpenChange={() => {
          setcreateProducts(false);
          seteditProduct(null);
          setformdata(initalFormdata);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {editProduct ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpLoad
            imageFile={imageFile}
            setimageFile={setimageFile}
            uploadImg={uploadImg}
            setUploadImg={setUploadImg}
            isLoading={isLoading}
            setisLoading={setisLoading}
            isEditMode={editProduct !== null}
          />
          <div className="py-6">
            <CommonForm
              formdata={formdata}
              setformdata={setformdata}
              formControls={addProductsdata}
              onSubmit={onSubmit}
              buttonText={editProduct ? "Update Product" : "Add Product"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
