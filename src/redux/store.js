import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../redux/tabSlice.js/tabSlice.js";

export default configureStore({
  reducer: {
    tab: tabReducer,
  },
});
