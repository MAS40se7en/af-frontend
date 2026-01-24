import axios from "axios"

export const uploadFiles = (files: File[]) => {
    const response = axios.post('http://localhost:8080/api/images/upload', files);
}