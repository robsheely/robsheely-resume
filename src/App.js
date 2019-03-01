import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import common from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";

import Resume from "./Resume";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: indigo,
    secondary: common
  }
});
const App = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Resume/>
    </MuiThemeProvider>
  );
};

export default App;
