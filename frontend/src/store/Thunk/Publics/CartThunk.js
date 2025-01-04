import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddtoCart = createAsyncThunk(
  "cart/AddtoCart",
  async ({ user, productId, quantity }) => {
    try {
      const { id, token } = user;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/add`,
        {
          userId: id,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (user) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ user, productId, quantity }) => {
    const { id, token } = user;
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/updatecart`,
      {
        userId: id,
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/ deleteCart",
  async ({ user, productId }) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/cart/${user?.id}/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    return res.data;
  }
);
