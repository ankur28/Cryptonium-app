import { configureStore } from "@reduxjs/toolkit";
import { cryptoAPi } from "../services/cryptoAPI";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {  
        [cryptoAPi.reducerPath]: cryptoAPi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
}); 