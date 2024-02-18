import './App.css';
import Homepage from "./components/homepage"
import Login from "./components/login"
import Signup from "./components/signup"
import {
  BrowserRouter as Router, 
  Route,
  Routes
} from "react-router-dom";
import { useState } from 'react';
import Forget from './components/forget';
import Verify from './components/verify';
import Reset from './components/Reset';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user && user._id ? <Homepage /> : <Login setLoginUser={setLoginUser}/>} />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Forget' element={<Forget/>}/>
          <Route path='/Verify' element={<Verify/>}/>
          <Route path='/Reset' element={<Reset/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
