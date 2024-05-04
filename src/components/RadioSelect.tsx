import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type TRadioSelect = {
  setDisplayToDos: React.Dispatch<
    React.SetStateAction<{ id: string; task: string; complete: boolean }[]>
  >;
};

function RadioSelect({ setDisplayToDos }: TRadioSelect) {
  const { toDos } = useSelector((state: RootState) => state.todo);
  const copyToDos = [...toDos];
  const filterToDos = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case "complete":
        const completeToDos = copyToDos.filter(
          (toDo: { id: string; task: string; complete: boolean }) =>
            toDo.complete === true
        );
        setDisplayToDos(completeToDos);
        break;
      case "notComplete":
        const notCompleteToDos = copyToDos.filter(
          (toDo: { id: string; task: string; complete: boolean }) =>
            toDo.complete === false
        );
        setDisplayToDos(notCompleteToDos);
        break;
      default:
        setDisplayToDos(copyToDos);
        break;
    }
  };
  return (
    <RadioGroup onChange={filterToDos} row>
      <FormControlLabel value="all" control={<Radio />} label="All" />
      <FormControlLabel value="complete" control={<Radio />} label="Complete" />
      <FormControlLabel
        value="notComplete"
        control={<Radio />}
        label="Not complete"
      />
    </RadioGroup>
  );
}

export default RadioSelect;
