import {FeedData, WebSocketStatus} from "../../types/ws-types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TFeedStore = {
    status: WebSocketStatus;
    feed: FeedData;
    connectionError: string | null;
};

const initialState: TFeedStore = {
    status: WebSocketStatus.OFFLINE,
    feed: {success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    connectionError: null,
};

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebSocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebSocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebSocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<FeedData>) => {
            state.feed = action.payload
        }
    },
    selectors: {
        getFeed: state => state.feed,
        getWebSocketStatus: state => state.status,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedSlice.actions;
export const { getFeed, getWebSocketStatus } = feedSlice.selectors;

export type TWsInternalActions = ReturnType<typeof feedSlice.actions[keyof typeof feedSlice.actions]>;