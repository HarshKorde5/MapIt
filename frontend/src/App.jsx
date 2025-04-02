import { Provider } from "react-redux";

import { store } from "./store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './components/LandingPage.jsx'
import AdminComponent from './admin/AdminComponent.jsx';
import HomeComponent from './components/HomeComponent.jsx'
import LoginComponent from './components/LoginComponent.jsx';
import ProfileSummary from "./components/ProfileSummary.jsx";
import UserProfileComponent from './components/UserProfileComponent.jsx';


function App() {

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/admin" element={<PrivateRoute><AdminComponent /></PrivateRoute>} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/profile" element={<ProfileSummary />} />
          <Route path="/user-details" element={<UserProfileComponent />} />

        </Routes>
      </Router>
    </Provider>


  )
}

export default App
