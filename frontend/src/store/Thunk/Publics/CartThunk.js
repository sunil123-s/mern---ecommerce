import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddtoCart = createAsyncThunk(
  "cart/AddtoCart",
  async ({ userId, productId, quantity }) => {
  try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/cart/add`, {
        userId,
        productId,
        quantity,
      });
      return res.data;
    }
   catch (error) {
    console.log(error)
  }
} 
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async({userId}) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/${userId}`
        );
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/updatecart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return res.data;
  }
);


export const deleteCart = createAsyncThunk(
    "cart/ deleteCart",
    async({userId, productId}) => {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/${userId}/${productId}`
        );
        return res.data
    }
);