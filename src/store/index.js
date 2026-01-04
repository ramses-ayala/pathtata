import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authUserSlice";
import { baseApi, baseApiHeaders } from "../services";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApiHeaders.reducerPath]: baseApiHeaders.reducer,
    authUser: authReducer
});

// redux persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authUser"] // persist authUser slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    }).concat(baseApi.middleware).concat(baseApiHeaders.middleware)
});

export const persistor = persistStore(store);