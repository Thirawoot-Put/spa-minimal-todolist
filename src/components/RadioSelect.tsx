import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterToDos } from "../redux/slice/todoSlice";

// type TRadioSelect = {
//   onSelect: (str: string) => void;
// };

function RadioSelect() {
  const dispatch = useDispatch();
  return (
    <RadioGroup onChange={(e) => dispatch(filterToDos(e.target.value))} row>
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
