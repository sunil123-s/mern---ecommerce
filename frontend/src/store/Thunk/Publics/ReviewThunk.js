import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const AddReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, userId, name, reviewMessage,userToken }) => {
    console.log(userToken)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/review/addrating`,
        { productId, userId, name, reviewMessage },{
          headers:{
            Authorization: `Bearer ${userToken}`
          }
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchReview = createAsyncThunk(
  "review/fetchReview",
  async ({productId,user}) => {
    console.log(user, productId)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/review/getrating/${productId}`,{
          headers: {
            Authorization : `Bearer ${user?.token}`
          }
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);