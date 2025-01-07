import ProductFilter from "./ProductFilter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/utils/DummyData/AddProductsData";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "@/store/Context/UserContext";
import { fetchProductDetails, fetchPublicProduct } from "@/store/Thunk/Publics/PublicProduct";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import ProductDetialDailog from "./ProductDetial";
import { AddtoCart, fetchCartItems } from "@/store/Thunk/Publics/CartThunk";
import toast from "react-hot-toast";
import SkeletonCard from "@/pages/common/SkeletonCard";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Listing = () => {
  const [openFilter, setopenFilter] = useState(false)
  const [filter, setfilter] = useState({})
  const [sort, setsort] = useState(null)
  const [dailogOpen, setdailogOpen] = useState(false)
  const[searchParams, setsearchParams] = useSearchParams()


  const dispatch = useDispatch()
  const {user} = ChatState()
  
  const { products, productDetails,isLoading } = useSelector((state) => state.publicProducts); 
  const categorySearch = searchParams.get("category")
  
  const handelProductDetails = (getpordcutdetailsId) => {
    dispatch(fetchProductDetails({id:getpordcutdetailsId, user}));
  }

  const handleSort = (value) => {
     setsort(value)
  }

  const handelFilter = (getSectionId, getCurrentOption) => {
       let copyfilter = {...filter};
       const indexofCurrentSection = Object.keys(copyfilter).indexOf(getSectionId);

       if(indexofCurrentSection === -1){
        copyfilter = {
          ...copyfilter, [getSectionId] : [getCurrentOption]
        }
       }else{
        const indexofCurrentOption = copyfilter[getSectionId].indexOf(getCurrentOption)

        if(indexofCurrentOption === -1){
          copyfilter[getSectionId].push(getCurrentOption)
        }else{
          copyfilter[getSectionId].splice(indexofCurrentOption, 1)
        }
       }
       setfilter(copyfilter)
       localStorage.setItem("filter", JSON.stringify(copyfilter))
  }
    
  const handelCartId = (CartItemId) => {
    dispatch(AddtoCart({user, productId:CartItemId, quantity:1}))
    .then((data) => {
      if(data.payload.success) {
        dispatch(fetchCartItems(user))
        toast.success('Product Add To Cart')
      }
    })
  }

  useEffect(() => {
    setsort("price-lowtohigh");
    setfilter(JSON.parse(localStorage.getItem("filter")) || {});
  }, [categorySearch]);
  
  
  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];
    for(const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",") 
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join("&")
  }

  useEffect(() => {
    if(filter && Object.keys(filter).length > 0){
      const createQueryString = createSearchParamsHelper(filter)
      setsearchParams(new URLSearchParams(createQueryString))
    }
  }, [filter])
  
    useEffect(() => {
      if(filter && sort)
      dispatch(
        fetchPublicProduct({ user, filterParams: filter, sortParams: sort })
      );
    }, [dispatch,sort,filter]);
   
    useEffect(() => {
      if (productDetails !== null) setdailogOpen(true);
    }, [productDetails]);
    
  
  return (
    <div className="relative top-20 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
      <Sheet open={openFilter} onOpenChange={() => setopenFilter(!openFilter)}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed left-6  z-20">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs">
          <ProductFilter filter={filter} handelFilter={handelFilter} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block">
        <ProductFilter filter={filter} handelFilter={handelFilter} />
      </div>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="fixed top-16 left-0 right-0 md:left-80 md:right-3 p-4 border-b flex items-center justify-between bg-white z-10">
          <h2 className="text-lg font-extrabold mr-2 ml-16">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sort) => (
                    <DropdownMenuRadioItem value={sort.id} key={sort.id}>
                      {sort.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isLoading && <SkeletonCard />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 mt-10 mb-32">
          {!isLoading &&
            products.map((singleItem) => (
              <ProductCard
                handelCartId={handelCartId}
                handelProductDetails={handelProductDetails}
                product={singleItem}
              />
            ))}
        </div>
        <ProductDetialDailog
          open={dailogOpen}
          setopen={setdailogOpen}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}

export default Listing
