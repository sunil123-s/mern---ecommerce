import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchAllProducts = createAsyncThunk(
        "products/fetchAllProducts",
        async(user) => {
            try {
                const res = await axios.get(
                  `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/allproducts`,
                  {
                    headers: {
                      Authorization: `Bearer ${user?.token}`,
                    },
                  }
                );
                return res.data 
            } catch (error) {
                  console.error("API Error:", error.response || error);
                
            }
        })

    export const addPorduct = createAsyncThunk("add/addPorduct", async (formdata,user) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/addProduct`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
           console.error("API Error:", error.response || error);
      }
    });

    export const updateProduct = createAsyncThunk(
      "edit/updateProduct",
      async ({formdata, id, user}) => {
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/updateproduct/${id}`,
            formdata,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          return res.data;
        } catch (error) {
          console.error("API Error:", error.response || error);
        }
      }
    );

    export const deleteProduct = createAsyncThunk(
      "delete/deleteProduct",
      async ({id,user}) => {
        try {
          const res = await axios.delete(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/deleteProduct/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          return res.data;
        } catch (error) {
            console.error("API Error:", error.response || error);
        }
      }
    );