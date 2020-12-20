import React from "react";
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
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoutes";

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/createwebinar" component={CreateWebinar}></Route>
            <PrivateRoute path="/mylearning" component={MyLearning}></PrivateRoute>
            <Route path="/myteaching" component={MyTeaching}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
