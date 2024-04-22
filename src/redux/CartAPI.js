import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helpers/AxiosInstance";

//createAsyncThunk liên quan đến bộ redux nên các api có giá trị dùng chung như cart sẽ viết ở đây
export const addItemToCartTable = createAsyncThunk(
    "carts",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("/carts/addCart_App", data);
            if (response.status == true) {
                return response.data;
            }
            else {
                return rejectWithValue(error);
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);







