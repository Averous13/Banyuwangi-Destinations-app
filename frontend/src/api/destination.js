import axios from "axios";

const destinationApi = axios.create({
    baseURL: "http://localhost:5000/api/destination"
});

export default destinationApi;

