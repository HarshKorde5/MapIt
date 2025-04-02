
import './App.css'
import HomeComponent from './components/HomeComponent.jsx'
import LandingPage from './components/LandingPage.jsx'
import ProfileSummary from "./components/ProfileSummary.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/profile" element={<ProfileSummary />} />
        </Routes>
      </Router>
    </Provider>
      
    
  )
}

export default App
