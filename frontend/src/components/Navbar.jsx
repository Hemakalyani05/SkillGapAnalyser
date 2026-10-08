import React, { useContext } from 'react';
<<<<<<< HEAD
import { Link, useNavigate, useLocation } from 'react-router-dom';
=======
import { NavLink, useNavigate } from 'react-router-dom';
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
import { AuthContext } from '../context/AuthContext';
import { Network } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
=======
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

<<<<<<< HEAD
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 50,
      padding: '1rem 0'
    }}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
          <Network className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
          SkillGap AI
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to="/profile" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  textDecoration: 'none', 
                  color: isActive('/profile') ? 'var(--accent-primary)' : 'var(--text-primary)', 
                  fontWeight: '500', 
                  marginRight: '1rem' 
                }}
              >
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} 
                  />
                )}
                <span className="hidden-mobile">{user.name}</span>
              </Link>
              {user.role === 'recruiter' && (
                <>
                  <Link to="/post-job" style={{ color: isActive('/post-job') ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem', fontWeight: isActive('/post-job') ? 'bold' : 'normal' }}>Post Job</Link>
                  <Link 
                    to="/admin" 
                    className="btn btn-outline" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.5rem 1rem',
                      backgroundColor: isActive('/admin') ? 'var(--accent-primary)' : 'transparent',
                      color: isActive('/admin') ? 'white' : 'inherit',
                      marginRight: '1rem'
                    }}>
                    Dashboard
                  </Link>
                  <Link to="/messages" style={{ color: isActive('/messages') ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem', fontWeight: isActive('/messages') ? 'bold' : 'normal' }}>Inbox</Link>
                </>
              )}
              {(user.role === 'candidate' || user.role === 'user') && (
                <>
                  <Link to="/jobs" style={{ color: isActive('/jobs') ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem', fontWeight: isActive('/jobs') ? 'bold' : 'normal' }}>Jobs</Link>
                  <Link to="/applications" style={{ color: isActive('/applications') ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem', fontWeight: isActive('/applications') ? 'bold' : 'normal' }}>My Applications</Link>
                  <Link 
                    to="/dashboard" 
                    style={{ 
                      color: isActive('/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                      textDecoration: 'none', 
                      marginRight: '1rem',
                      fontWeight: isActive('/dashboard') ? 'bold' : 'normal'
                    }}>
                    Dashboard
                  </Link>
                  <Link to="/messages" style={{ color: isActive('/messages') ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem', fontWeight: isActive('/messages') ? 'bold' : 'normal' }}>Inbox</Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
=======
  const activeStyle = {
    color: 'var(--accent-primary)',
    fontWeight: '600'
  };

  const normalStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none'
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 50,
        padding: '1rem 0'
      }}
    >
      <div className="container flex justify-between items-center">

        <NavLink
          to="/"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Network
            className="w-6 h-6"
            style={{ color: 'var(--accent-primary)' }}
          />
          SkillGap AI
        </NavLink>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginRight: '1rem',
                  textDecoration: 'none',
                  ...(isActive ? activeStyle : normalStyle)
                })}
              >
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  />
                )}
                <span className="hidden-mobile">{user.name}</span>
              </NavLink>

              <NavLink
                to="/dashboard"
                style={({ isActive }) => ({
                  marginRight: '1rem',
                  textDecoration: 'none',
                  ...(isActive ? activeStyle : normalStyle)
                })}
              >
                Dashboard
              </NavLink>

              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline">
                Login
              </NavLink>

              <NavLink to="/register" className="btn btn-primary">
                Sign Up
              </NavLink>
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
