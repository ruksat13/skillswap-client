import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SkillDetails from "./pages/SkillDetails/SkillDetails";
import MyProfile from "./pages/MyProfile/MyProfile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/skill/:id"
            element={
              <PrivateRoute>
                <SkillDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;