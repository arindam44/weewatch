import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./Utils/Theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Peer from "peerjs";
// import io from "socket.io-client";
import Login from "./Pages/Login";
import Meeting from "./Pages/Meeting";

// const socket = io("http://localhost:5000");
// const peer = new Peer(undefined, {
// 	path: "/peerjs",
// 	host: "/",
// 	port: 5000,
// });
// peer.on("open", (id) => {
// 	console.log(peer);
// 	localStorage.setItem("socket", socket);
// 	localStorage.setItem("peer", peer);
// 	localStorage.setItem("id", id);
// });

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
