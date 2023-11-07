import "./App.css";
import "./styles/dark.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatableSource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <Router>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={userColumns} title="Users" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <New />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="hotels">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={hotelColumns} title="Hotels" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":hotelId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewHotel />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="rooms">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={roomColumns} title="Rooms" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":roomId"
                  element={
                    <ProtectedRoute>
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewRoom />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
