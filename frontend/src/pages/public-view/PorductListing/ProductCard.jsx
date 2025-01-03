import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categoryOptionsMap, brandOptionsMap } from "@/utils/DummyData/AddProductsData"

const ProductCard = ({ product, handelProductDetails, handelCartId }) => {
  return (
    <Card className="w-full max-w-sm mx-auto mt-4 cursor-pointer hover:shadow-2xl hover:shadow-black transition-shadow">
      <div onClick={() => handelProductDetails(product._id)}>
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg"
            src={product?.image}
            alt={product?.title}
          />
          {product.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product.salePrice > 0 ? "line-through text-red-600" : "text-green-500"}text-lg font-semibold text-primary`}
            >
              {product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg text-primary font-semibold">
                {product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => handelCartId(product?._id)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard
