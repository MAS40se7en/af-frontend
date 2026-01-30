import { api } from "@/lib/axios";

export interface RegisterUserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export const signUpUser = async (userData: RegisterUserData) => {
    const response = await api.post('/users/register', userData);

    console.log(response);
    return response;
}

export const signInUser = async (userData: LoginUserData) => {
    const response = await api.post('/users/login', userData);

    console.log(response);
    return response;
}

export const fetchUserProfile = async () => {
    const response = await api.get('/users/fetch-profile');

    return response.data;
}

export const signOutUser = async () => {
    await api.post('/users/logout');
}

export const checkUserSession = async () => {
    const response = await api.get('/users/check-session');
    return response.data;
}