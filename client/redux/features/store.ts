'use client'
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});


const initalizeApp = async () => {
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

initalizeApp();



// 'use client'

// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
// import authSlice from "./auth/authSlice";

// export const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authSlice,
//     },
//     devTools: process.env.NODE_ENV === "development", // Enable only in development
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });

// const initializeApp = async () => {
//     // Ensure dispatch is awaited and use the correct method to initiate loadUser query.
//     try {
//         await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
//     } catch (error) {
//         console.error("Error initializing app:", error);
//     }
// };

// initializeApp();

// // Export store for later use in the app
// export default store;
