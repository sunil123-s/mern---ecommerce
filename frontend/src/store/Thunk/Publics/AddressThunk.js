import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddNewAddress = createAsyncThunk(
    "address/AddNewAddress",
    async(formData) => {
        try {
           const { userToken, ...data } = formData;
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/address/add`,
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (user) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/${user?.id}`,
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

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({formData, user, addressId}) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/edit/${user?.id}/${addressId}`,
        formData,
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

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({user, addressId}) => {              
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/delete/${user?.id}/${addressId}`,
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