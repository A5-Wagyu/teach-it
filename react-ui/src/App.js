import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";


function App() {
	return (
		<div className="App">
			<Router>
				<Header/>
				<Switch>
					<Route path="/login" component={Login}></Route>
				</Switch>
			</Router>
		</div>
	);

}

export default App;
