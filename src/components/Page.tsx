import { useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Todo from "./Todo";
import { RootState } from "../redux/store";
import { addToDo } from "../redux/slice/todoSlice";
import RadioSelect from "./RadioSelect";

function Page() {
  const dispatch = useDispatch();

  const { toDos } = useSelector((state: RootState) => state.todo);
  const [input, setInput] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  const handleAddToDo = () => {
    dispatch(addToDo({ task: input }));
    setInput("");
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
        <RadioSelect />
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
      {toDos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Box>
  );
}

export default Page;
