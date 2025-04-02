
import { Home } from 'lucide-react'
import './App.css'
import HomeComponent from './components/HomeComponent.jsx'
import LandingPage from './components/LandingPage.jsx'
import MapComponent from './components/MapComponent.jsx'
import { Provider } from "react-redux";
import { store } from "./store";

function App() {

  return (
    
    <Provider store={store}>
      <HomeComponent />
    </Provider>
      
    
  )
}

export default App
