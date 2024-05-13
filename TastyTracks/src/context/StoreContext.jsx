import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [ratings, setRatings] = useState(0);

    const addToCart = (rest_id,item) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            const key = `${rest_id}_${item}`; // Generate unique key combining rest_id and item
            updatedItems[key] = (prevItems[key] || 0) + 1; // Increment quantity of item with generated key
            return updatedItems;
          });
    };

    const removeFromCart = (rest_id,item) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            const key = `${rest_id}_${item}`; // Generate unique key combining rest_id and item
            if (updatedItems[key] > 0) {
              updatedItems[key] -= 1; // Decrement quantity of item with generated key
            }
            return updatedItems;
          });
    };

    const updateRating = (restId,item, newRating) => {
        const key=`${restId}_${item}`;
        setRatings((prev) => ({ ...prev, [key]: newRating }));
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log(ratings);
    }, [ratings]);

    useEffect(() => {
        async function fetchFoodData() {
            try {
                var response = await axios.get('http://localhost:8080/api/food/all');
                setFoodList(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        }
        fetchFoodData();
    }, []);

 

    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        ratings,
        updateRating,
        addToCart,
        removeFromCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
