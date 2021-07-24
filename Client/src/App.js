import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState } from "react";

import Auth from "./user/pages/Auth";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let routes;
  // setIsLoggedIn(false);
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <h1>Home Page</h1>
        </Route>
        <Route path="/:userId/tasks" exact>
          <h1>My tasks</h1>
        </Route>
        <Route path="/tasks/new" exact>
          <h1>New task</h1>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <h1>Home Page</h1>
        </Route>
        <Route path="/auth" exact>
          {/* <h1>Authorize to Enter todo world</h1> */}
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <>
      <Router>
        <main>{routes}</main>
      </Router>
    </>
  );
};

export default App;
