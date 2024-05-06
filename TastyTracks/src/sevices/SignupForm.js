import axios from 'axios';

const API_URL ="http://localhost:8080";

class UserService{
    save(formData){
        return axios.post(API_URL + "/register", formData);
    }

    save(foodformData){
        return axios.post(API_URL + "/api/food/save", foodformData);
    }

}