import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [ratings, setRatings] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCartItems = { ...prev };
            if (updatedCartItems[itemId] > 1) {
                updatedCartItems[itemId] -= 1;
            } else {
                delete updatedCartItems[itemId];
            }
            return updatedCartItems;
        });
    };

    const updateRating = (itemId, newRating) => {
        setRatings((prev) => ({ ...prev, [itemId]: newRating }));
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
               // console.log("Get foodlist "+ response);
               //console.log("Get foodlist "+ response.data.map((ix) => ix.rest_id));
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
