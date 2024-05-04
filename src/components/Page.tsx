import { useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Todo, { TToDo } from "./Todo";
import { RootState } from "../redux/store";
import { addToDo } from "../redux/slice/todoSlice";
import RadioSelect from "./RadioSelect";
import { nanoid } from "@reduxjs/toolkit";

function Page() {
  const dispatch = useDispatch();

  const { toDos } = useSelector((state: RootState) => state.todo);
  const [input, setInput] = useState("");
  const [displayToDos, setDisplayToDos] = useState(toDos);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  const handleAddToDo = () => {
    const newToDo = { task: input, id: nanoid(), complete: false };
    const copyToDos = [...displayToDos];
    copyToDos.push(newToDo);
    setDisplayToDos(copyToDos);
    dispatch(addToDo(newToDo));
    setInput("");
  };

  const onDeleteToDo = (id: string) => {
    const foundIndex = displayToDos.findIndex((todo) => todo.id === id);
    if (foundIndex !== -1) {
      const copyToDos = [...displayToDos];
      copyToDos.splice(foundIndex, 1);
      setDisplayToDos(copyToDos);
    }
  };

  const onCheckBoxChange = (item: TToDo) => {
    const foundIndex = displayToDos.findIndex((todo) => todo.id === item.id);
    if (foundIndex !== -1) {
      const copyToDos = [...displayToDos];
      copyToDos.splice(foundIndex, 1, item);
      setDisplayToDos(copyToDos);
    }
  };

  return (
    <Box
      sx={{
        paddingBlock: "1rem",
      }}
    >
      <Box>
        <Typography
          sx={{ textAlign: "center", paddingBottom: "1rem" }}
          variant="h5"
        >
          Todo list
        </Typography>
        <RadioSelect setDisplayToDos={setDisplayToDos} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "0.5rem",
        }}
      >
        <Input
          onChange={handleChangeInput}
          fullWidth={true}
          placeholder="Add your task"
          value={input}
        />
        <Button onClick={handleAddToDo} variant="outlined">
          add
        </Button>
      </Box>
      {displayToDos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDeleteToDo={onDeleteToDo}
          onCheckBoxChange={onCheckBoxChange}
        />
      ))}
    </Box>
  );
}

export default Page;
