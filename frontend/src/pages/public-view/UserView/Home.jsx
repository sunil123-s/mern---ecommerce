import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"; 
import { useState, useEffect } from "react";
import image1 from "../../../assets/banner-1.webp";
import image2 from "../../../assets/banner-2.webp";
import image3 from "../../../assets/banner-3.jpg";
import image4 from "../../../assets/banner-4.jpg";
import image5 from "../../../assets/banner-5.jpg";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchPublicProduct } from "@/store/Thunk/Publics/PublicProduct";
import { ChatState } from "@/store/Context/UserContext";
import ProductCard from "../PorductListing/ProductCard";
import { useNavigate } from "react-router-dom";
import { categoryIcons } from "@/utils/DummyData/AddProductsData";
import { brandIcon } from "@/utils/DummyData/AddProductsData";
import { AddtoCart, fetchCartItems } from "@/store/Thunk/Publics/CartThunk";
import toast from "react-hot-toast";
import ProductDetialDailog from "../PorductListing/ProductDetial";
import SkeletonCard from "@/pages/common/SkeletonCard";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dailogOpen, setdailogOpen] = useState(false);
  const slides = [image1, image2, image3,image4, image5];
  const dispatch = useDispatch();
  const { products, productDetails, isLoading } = useSelector((state) => state.publicProducts);
  const navigation = useNavigate();
  const {user} = ChatState()
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
     dispatch(fetchPublicProduct({ user, filterParams:{}, sortParams:"price-lowtohigh" }));
  }, [dispatch])
  
  const handelnavigatetoListing = (currentItem , section) => {
      localStorage.removeItem("filter")
      const currentfilter = {
        [section] : [currentItem.label]
      }
      localStorage.setItem("filter", JSON.stringify(currentfilter))
      navigation("/shop/listing")
  }

    const handelCartId = (CartItemId) => {
      dispatch(
        AddtoCart({ user, productId: CartItemId, quantity: 1 })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchCartItems(user));
          toast.success("Product Add To Cart");
        }
      });
    };

const handelProductDetails = (getpordcutdetailsId) => {
    dispatch(fetchProductDetails({id:getpordcutdetailsId, user}));
  }

    useEffect(() => {
      if (productDetails !== null) setdailogOpen(true);
    }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full lg:h-[900px] md:h-[600px] h-[350px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`absolute top-[66px] left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white z-20 hidden"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white z-20 hidden"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryIcons.map((item) => (
              <Card
                className="cursor-pointer hover:shadow-2xl transition-shadow"
                onClick={() => handelnavigatetoListing(item, "category")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Brand</h2>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandIcon.map((item) => (
              <Card
                className="cursor-pointer hover:shadow-2xl transition-shadow"
                onClick={() => handelnavigatetoListing(item, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={item?.icon}
                    className="w-12 h-12 mb-4 text-primary"
                    alt=""
                  />
                  <span className="font-bold">
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Product
          </h2>
          {isLoading && <SkeletonCard />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!isLoading && products && products.length > 0
              ? products.map((productItem) => (
                  <ProductCard
                    key={productItem._id}
                    handelProductDetails={handelProductDetails}
                    product={productItem}
                    handelCartId={handelCartId}
                  />
                ))
              : null}
          </div>
          <ProductDetialDailog
            open={dailogOpen}
            setopen={setdailogOpen}
            productDetails={productDetails}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
