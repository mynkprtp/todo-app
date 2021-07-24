import { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

let logoutTimer;
const App = () => {
  const [allTasks, setAllTasks] = useState([
    {
      id: "t1",
      title: "title 1",
    },
    {
      id: "t2",
      title: "title 2",
    },
    {
      id: "t3",
      title: "title 3",
    },
    {
      id: "t4",
      title: "title 4",
    },
    {
      id: "t5",
      title: "title 5",
    },
  ]);
  const addNewTask = (newTask) => {
    console.log(newTask);
    setAllTasks((prevTasks) => {
      return prevTasks.concat(newTask);
    });
  };

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // it will run only once and will not be redeclared

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingtime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingtime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/tasks" exact>
          <NewTask onAdd={addNewTask} />
          <TaskList userTasks={allTasks} />
        </Route>
        <Redirect to="/tasks" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
