import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/logIn"
            element={<LogIn />}
          />
          <Route
            path="/signUp"
            element={<SignUp />}
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute children={<Profile />} />
            }
          />
          <Route path="*" element={<h1>Page not found 404 :(</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
