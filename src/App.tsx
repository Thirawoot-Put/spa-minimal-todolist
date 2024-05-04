import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Box } from "@mui/material";
import { Provider } from "react-redux";

import Page from "./components/Page";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          margin: "auto",
          maxWidth: "60vw",
          minHeight: "90vh",
          border: "1px black solid",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Page />
      </Box>
    </Provider>
  );
}

export default App;
