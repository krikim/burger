import { combineSlices, configureStore as createStore, ThunkDispatch } from "@reduxjs/toolkit";
import { burgerApi } from "./api";
import { constrSlice, TconstrSliceActions } from "./constrSlice";
import { ingredientSlice, TingredientSliceActions } from "./ingredientSlice";
import { currentIngredientSlice, TcurrentIngridientActions } from "./currentIngredientSlice";
import { TuserSliceActions, userSlice } from "./userSlice";
import { feedSlice, TWsInternalActions, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./ws/ws-slice";
import { socketMiddleware } from "./ws/ws-mware";
import { TWsExternalActions, wsConnect, wsDisconnect } from "./ws/ws-actions";
import { useDispatch as dispatchHook, useSelector as selectorHook, } from 'react-redux';

export type TApplicationActions = TWsExternalActions | TWsInternalActions | TconstrSliceActions | TuserSliceActions| TingredientSliceActions | TcurrentIngridientActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export const rootReducer = combineSlices(burgerApi,constrSlice, ingredientSlice, currentIngredientSlice, userSlice, feedSlice);

const feedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
});


export const configureStore = () => {
    const store = createStore({
        reducer: rootReducer,
        //preloadedState: initialState, 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(burgerApi.middleware).concat(feedMiddleware),
        devTools: process.env.NODE_ENV === "development"
    });
    return store;
} 

export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()