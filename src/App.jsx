import './App.css'
import DashBoard from './components/DashBoard'
import Marketplace from './components/Marketplace'
import Navbar from './components/Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Request from './components/Request'
import Login from './components/Login'
import Signup from './components/Signup'
function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/request" element={<Request/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    
    </div>
    
  )
}

export default App
