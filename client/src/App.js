import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./Utils/Theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Meeting from "./Pages/Meeting";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/room/:roomId" component={Meeting} />
          </Switch>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
