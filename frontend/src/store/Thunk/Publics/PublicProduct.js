import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPublicProduct = createAsyncThunk(
  "porduct,fetchPUblicProduct",
  async ({ user, filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/public/allproducts?${query}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    return res.data;
  }
); 

export const fetchProductDetails = createAsyncThunk(
  "product,fetchProductDetails",
  async ({id,user}) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/public/productdetails/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    return res.data;
  }
); 