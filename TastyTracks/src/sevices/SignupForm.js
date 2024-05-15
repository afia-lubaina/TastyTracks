import axios from 'axios';

const API_URL ="http://localhost:8080";

class UserService{
    save(formData){
        return axios.post(API_URL + "/register", formData);
    }

    save(foodformData){
        return axios.post(API_URL + "/api/food/save", foodformData);
    }

    SaveRest(restaurantFormData){
        return axios.post(API_URL+ "/api/restaurant/register",restaurantFormData);
    }

    saveReview(formData){
        return axios.post(API_URL + "/api/review/save", formData);
    }

    updateFood(formData){
        return axios.put(API_URL + `/api/food/update/${item}/${restId}`, formData);
    }

    deleteFood(){
        return axios.delete(API_URL + `/api/food/delete/${item}/${restId}`);
    }

    save(formData){
        return axios.post(API_URL + "/api/review/save", formData);
    }

    loginRest(email,password){
        return axios.post(API_URL + "/api/restaurant/login", {email,password});
    }

    save(formData){
        return axios.post(API_URL + "/api/user/register", formData);
    }

    save(formData){
        return axios.post(API_URL + "/api/reservation/save", formData);
    }

    save(formData){
        return axios.post(API_URL + "/api/order/save", formData);
    }

    save(formData){
        return axios.post(API_URL + "/api/order/save", formData);
    }





}