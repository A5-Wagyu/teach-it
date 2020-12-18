import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateWebinar from "./pages/CreateWebinar";
import WebinarDetail from "./pages/WebinarDetail";
import MyLearning from "./pages/MyLearning";
import MyTeaching from "./pages/MyTeaching";

function App() {


	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/signup" component={SignUp}></Route>
					<Route path="/createwebinar" component={CreateWebinar}></Route>
					<Route path="/webinardetail" component={WebinarDetail}></Route>
					<Route path="/mylearning" component={MyLearning}></Route>
					<Route path="/myteaching" component={MyTeaching}></Route>
					<Route path="/" exact component={Home}></Route>
				</Switch>
			</Router>
		</div>
	);

}

export default App;
