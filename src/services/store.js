import { combineSlices, configureStore as createStore } from "@reduxjs/toolkit";
import { burgerApi } from "./api";
import { constrSlice } from "./constrSlice";
import { ingredientSlice } from "./ingredientSlice";
import { currentIngredientSlice } from "./currentIngredientSlice";


export const rootReducer = combineSlices(burgerApi,constrSlice, ingredientSlice, currentIngredientSlice);

export const configureStore = (initialState) => {
    const store = createStore({
        reducer: rootReducer,
        preloadedState: initialState, 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(burgerApi.middleware),
        devTools: process.env.NODE_ENV === "development"
    });
    return store;
} 
