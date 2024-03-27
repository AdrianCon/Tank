import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    getTasks: () => {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        return JSON.parse(tasks);
      } else {
        return [];
      }
    },
    addTask: (state, action) => {
      const newTask = {
        task: action.payload,
        status: "pending",
      };

      localStorage.setItem("tasks", JSON.stringify([...state, newTask]));
      return [...state, newTask];
    },
    updateTaskStatus: (state, action) => {
      state[action.payload].status =
        state[action.payload].status === "pending" ? "done" : "pending";
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const newTasks = state;
      newTasks.splice(action.payload, 1);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTasks, addTask, updateTaskStatus, removeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
