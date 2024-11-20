import './styles/App.css';
import './styles/base/base.css';
import './styles/base/utilities.css';
import './styles/base/colors.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';



function App() {
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/InstructorDashboard" element={<InstructorDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
