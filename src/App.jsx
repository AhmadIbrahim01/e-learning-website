import './styles/App.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
