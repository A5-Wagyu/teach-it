import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
			</Router>
		</div>
	);
}

export default App;
