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
import Admin from './pages/Admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AllStudents from './pages/AllStudents.jsx';
import AddInstructor from './pages/AddInstructor.jsx';
import StudentPage from './pages/StudentPage.jsx';
import StudentCourses from './pages/studentCourses.jsx';

function App() {
  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/StudentCourses" element={
                      <ProtectedRoute allowedUserType="student">
                      <StudentCourses />
                    </ProtectedRoute>
        } />
        <Route path="/StudentPage" element={
                      <ProtectedRoute allowedUserType="student">
                      <StudentPage />
                    </ProtectedRoute>
        } />
        <Route path="/AllStudents" element={
                      <ProtectedRoute allowedUserType="admin">
                      <AllStudents />
                    </ProtectedRoute>
        } />
        <Route path="/AddInstructor" element={
                      <ProtectedRoute allowedUserType="admin">
                      <AddInstructor />
                    </ProtectedRoute>
        } />
        <Route path="/InstructorDashboard" element={
                      <ProtectedRoute allowedUserType="instructor">
                      <InstructorDashboard />
                    </ProtectedRoute>
        } />
        <Route path="/StudentDashboard" element={
                      <ProtectedRoute allowedUserType="student">
                      <StudentDashboard />
                    </ProtectedRoute>
        } />
        <Route path="/Admin" element={
                      <ProtectedRoute allowedUserType="admin">
                      <Admin />
                    </ProtectedRoute>
        } />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
