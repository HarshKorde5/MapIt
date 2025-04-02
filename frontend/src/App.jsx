
import HomeComponent from './components/HomeComponent.jsx'
import LandingPage from './components/LandingPage.jsx'
import ProfileSummary from "./components/ProfileSummary.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileSettingsPage from './components/ProfileSettingsPage.jsx';
import UserProfileComponent from './components/UserProfileComponent.jsx';
import AdminComponent from './admin/AdminComponent.jsx';
function App() {

  return (
    
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/profile" element={<ProfileSummary />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          <Route path="/user-details" element={<UserProfileComponent />} />

          <Route path="/admin" element={<AdminComponent />} />
        </Routes>
      </Router>
    </Provider>
      
    
  )
}

export default App
