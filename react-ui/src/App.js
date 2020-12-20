import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateWebinar from "./pages/CreateWebinar";
import MyLearning from "./pages/MyLearning";
import MyTeaching from "./pages/MyTeaching";
import Search from "./pages/Search";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  let auth;
  if (localStorage.getItem("jwt")) {
    auth = true;
  } else auth = false;
  const [isAuthenticated, setIsAuthenticated] = useState(auth);
  return (
    <div className="App">
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated} />
        <Switch>
          <Route path="/login"
            render={(props) => <Login {...props}
              setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" component={SignUp}></Route>
          <PrivateRoute path="/createwebinar" component={CreateWebinar}></PrivateRoute>
          <PrivateRoute path="/mylearning" component={MyLearning}></PrivateRoute>
          <Route path="/myteaching" component={MyTeaching}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/" exact component={Search}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
