import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helpers/AxiosInstance";

//createAsyncThunk liên quan đến bộ redux nên các api có giá trị dùng chung như user sẽ viết ở đây
export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("/users/login_App", data);
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

export const register = createAsyncThunk(
    "user/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("/users/register_App", data);
            if (response.status == true) {
                return response.data;
            }
            else {
                return rejectWithValue(error);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateAccount = createAsyncThunk(
    "user/update",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post(`/users/${data.id}/updateUser_App`, data);
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

//lấy thông tin user
export const getUser = createAsyncThunk(
    "user/getUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("/users/getUser_App", data);
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






