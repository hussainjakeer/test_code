// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducers";
// const store = configureStore({ reducer });
// export default store;


import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
});

export default store;
