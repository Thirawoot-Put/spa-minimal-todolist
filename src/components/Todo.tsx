import { Box, Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

import { checkComplete, deleteToDo } from "../redux/slice/todoSlice";

export type TToDo = {
  id: string;
  task: string;
  complete: boolean;
};

type TToDoProps = {
  todo: TToDo;
};

function Todo({ todo }: TToDoProps) {
  const dispatch = useDispatch();
  const handleDeleteToDo = (id: string) => dispatch(deleteToDo(id));
  const handleCheckChange = () => {
    const copyToDo = { ...todo, complete: !todo.complete };
    dispatch(checkComplete(copyToDo));
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox checked={todo?.complete} onChange={handleCheckChange} />
        }
        label={`${todo?.task}`}
      />
      <DeleteIcon
        role="button"
        onClick={() => handleDeleteToDo(todo?.id)}
        sx={{ fontSize: "medium", color: "tomato", cursor: "pointer" }}
      />
    </Box>
  );
}

export default Todo;
