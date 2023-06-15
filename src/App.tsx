import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Login";
import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

// import EventBus from "./common/EventBus";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    // EventBus.on("logout", logOut);

    return () => {
      // EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-emerald-700">
        {/* <Link to={"/"} className="flex items-center justify-between text-blue-gray-900">
          bezKoder
        </Link> */}
        <div className="mr-4 cursor-pointer py-1.5 font-medium">
          {/* <li className="mr-4 hidden lg:block">
            <Link to={"/home"} className="mr-4 hidden lg:block">
              Home
            </Link>
          </li> */}

          {showModeratorBoard && (
            <li className="flex items-center gap-4">
              <Link to={"/mod"} className="mr-4 hidden lg:block">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="flex items-center gap-4">
              <Link to={"/admin"} className="mr-4 hidden lg:block">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="flex items-center gap-4">
              <Link to={"/user"} className="mr-4 hidden lg:block">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="flex items-center gap-4">
            <li className="mr-4 hidden lg:block">
              <Link to={"/profile"} className="mr-4 hidden lg:block">
                {currentUser.username}
              </Link>
            </li>
            <li className="mr-4 hidden lg:block">
              <a href="/login" className="mr-4 hidden lg:block" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0"
          >
            <li className="px-4 py-2 text-black bg-gray-300 rounded-md hover:bg-gray-800 inline-block">
              <Link to={"/login"} className="text-black">
                Login
              </Link>
            </li>

            <li className="px-4 py-2 text-black bg-gray-300 rounded-md hover:bg-gray-800 inline-block ">
              <Link to={"/register"} className="text-black">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/user" element={<BoardUser />} /> */}
          {/* <Route path="/mod" element={<BoardModerator />} /> */}
          {/* <Route path="/admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;