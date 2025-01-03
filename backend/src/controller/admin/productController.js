import { ImageUpload } from "../../util/cloudinaryImage.js";
import Product from "../../model/Products.js";

export const handelImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "failed to upload Imge" });
  }
};


export const AddNewProduct = async(req,res) => {
    try {
      const {image, title, brand, category, description, price, salePrice, totalStock } = req.body;

      const addProduct = new Product({
         image,
         title,
         brand,
         category,
         description,
         price,
         salePrice,
         totalStock
      })

      await addProduct.save()
      res.status(200).json({success:true, message:"Product Add", data:addProduct})

    } catch (error) {
      console.log(error)
      res.status(404).json({success:false, message:"Failed To Add Product"})
    }
}

export const AllProducts = async (req,res) => {
   try {
      const allProduct = await Product.find({})
      res.status(200).json({success:true,message:"All Products", data:allProduct})
   } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ success: false, message: "Failed To Show Products" });
   }
}

export const editProducts = async(req,res) => {
  try {
     const {id} = req.params
     const {
       image,
       title,
       brand,
       category,
       description,
       price,
       salePrice,
       totalStock,
     } = req.body;
    
     const updatedProducts = await Product.findByIdAndUpdate(id,{
          image,
          title,
          brand,
          category,
          description,
          price,
          salePrice,
          totalStock,
     },{new:true, runValidators:true}
    )
      res.status(200).json({success:true, message:"Product Updated", data:updatedProducts})
  } catch (error) {
     console.log(error);
     res.status(404).json({ success: false, message: "Failed To Edit Product" });
  }
}

export const deleteProduct = async(req,res) => {
   try {
      const {id} = req.params;

      const deleteProduct = await Product.findByIdAndDelete(id)
      if(!deleteProduct){
        return res.status(401).json({success:true,message:"Product not Found"})
      }

      res.status(200).json({success:true, message:"Product Deleted"})
   } catch (error) {
     console.log(error);
     res
       .status(404)
       .json({ success: false, message: "Failed To Edit Product" });
   }
}