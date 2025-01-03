import Cart from "../../model/Cart.js";
import Product from "../../model/Products.js";

export const AddCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(404).json({ success: false, message: "Invaild Data" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const currentproductindex = cart.items.findIndex(
      (items) => items.productId.toString() === productId
    );

    if (currentproductindex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[currentproductindex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Failed to Add" });
  }
};

export const CartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {`1`
      return res
        .status(404)
        .json({ success: false, message: "user Not found" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not found" });
    }

    const vaildItem = cart.items.filter((productItem) => productItem.productId);

    if (vaildItem.length < cart.items.length) {
      cart.items = vaildItem;
      await cart.save();
    }

    const populateCartItems = vaildItem.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      salePrice: item.productId.salePrice,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "Failed to Show CartItems" });
  }
};

export const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(404).json({ success: false, message: "Invaild Data" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not found" });
    }

    const currentproductindex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (currentproductindex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Items not Found" });
    }

    cart.items[currentproductindex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Failed To Update" });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;


    if (!userId || !productId ) {
      return res.status(404).json({ success: false, message: "Invaild Data" });
    }

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title salePrice Price",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Failed to Delete" });
  }
};
