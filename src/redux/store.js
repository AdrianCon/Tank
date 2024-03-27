import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../redux/tabSlice.js/tabSlice.js";
import tasksReducer from "../redux/tasksSlice.js";

export default configureStore({
  reducer: {
    tab: tabReducer,
    tasks: tasksReducer,
  },
});
