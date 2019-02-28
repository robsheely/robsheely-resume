import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import Resume from './Resume';
//import Content from './Content';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: yellow,
    secondary: red // Indigo is probably a good match with pink
  }
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Resume/>
      </MuiThemeProvider>
    );
  }
}

export default App;
