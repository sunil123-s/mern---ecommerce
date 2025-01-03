import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddNewAddress = createAsyncThunk(
    "address/AddNewAddress",
    async(formData) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/address/add`,
            formData
          );
          return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({formData, userId, addressId}) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/edit/${userId}/${addressId}`,
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({userId, addressId}) => {              
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/address/delete/${userId}/${addressId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);