import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
<<<<<<< HEAD
import Home from './pages/Home';
=======
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
<<<<<<< HEAD
import AdminDashboard from './pages/AdminDashboard';
import JobsFeed from './pages/JobsFeed';
import Applications from './pages/Applications';
import PostJob from './pages/PostJob';
import JobApplicants from './pages/JobApplicants';
import Messages from './pages/Messages';
=======
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="container" style={{paddingTop: '5rem'}}>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '4rem' }}>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
=======
          <Route path="/" element={<Navigate to="/dashboard" />} />
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analysis/:jobId" 
            element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
<<<<<<< HEAD
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobsFeed />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/applications" 
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/job-applicants/:jobId" 
            element={
              <ProtectedRoute>
                <JobApplicants />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } 
          />
=======
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
        </Routes>
      </div>
    </Router>
  );
}

export default App;
