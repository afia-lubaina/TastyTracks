import React, { createContext, useState, useEffect } from "react";
import { food_list } from '../assets/assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
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

    const updateRating = (itemId, newRating) => { // Change the parameter name from 'ratings' to 'newRating'
        setRatings((prev) => ({ ...prev, [itemId]: newRating }));
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log(ratings);
    }, [ratings]);

    const contextValue = {
        food_list,
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
