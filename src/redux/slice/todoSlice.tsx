import { createSlice, nanoid } from "@reduxjs/toolkit";

const toDoList =
  localStorage.getItem("toDos") !== null
    ? JSON.parse(localStorage.getItem("toDos")!)
    : [];

type TInitialState = {
  toDos: { id: string; task: string; complete: boolean }[];
};

const initialState: TInitialState = {
  toDos: toDoList,
};

const toDoSlice = createSlice({
  name: "todoSlice",
  initialState: initialState,
  reducers: {
    addToDo: (state, action) => {
      const newToDo = { ...action.payload, id: nanoid(), complete: false };
      state.toDos.push(newToDo);
      localStorage.setItem("toDos", JSON.stringify(state.toDos));
    },
    deleteToDo: (state, action) => {
      const foundIndex = state.toDos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (foundIndex !== -1) {
        state.toDos.splice(foundIndex, 1);
        localStorage.setItem("toDos", JSON.stringify(state.toDos));
      }
    },
    checkComplete: (state, action) => {
      const foundIndex = state.toDos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (foundIndex !== -1) {
        state.toDos.splice(foundIndex, 1, action.payload);
        localStorage.setItem("toDos", JSON.stringify(state.toDos));
      }
    },
    filterToDos: (state, action) => {
      const originalTodo = JSON.parse(localStorage.getItem("toDos")!);
      console.log(originalTodo);
      switch (action.payload) {
        case "complete":
          const completeToDos = originalTodo.filter(
            (toDo: { id: string; task: string; complete: boolean }) =>
              toDo.complete === true
          );
          return { ...state, toDos: completeToDos };
        case "notComplete":
          const notCompleteToDos = originalTodo.filter(
            (toDo: { id: string; task: string; complete: boolean }) =>
              toDo.complete === false
          );
          return { ...state, toDos: notCompleteToDos };
        default:
          return { ...state, toDos: toDoList };
      }
    },
  },
});

export const { addToDo, deleteToDo, checkComplete, filterToDos } =
  toDoSlice.actions;

const todoReducer = toDoSlice.reducer;
export default todoReducer;
