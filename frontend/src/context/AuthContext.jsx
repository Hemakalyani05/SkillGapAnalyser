<<<<<<< HEAD
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Set token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

=======
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          if (res.data.theme) {
            document.documentElement.setAttribute('data-theme', res.data.theme);
          }
        } catch (err) {
          console.error('Error fetching user', err);
          localStorage.removeItem('token');
=======
  // Axios instance
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
  });

  // Set token to headers
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
          if (res.data.theme) {
            document.documentElement.setAttribute("data-theme", res.data.theme);
          }
        } catch (err) {
          console.error("Error fetching user", err);
          localStorage.removeItem("token");
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

<<<<<<< HEAD
  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('Error refreshing user', err);
      }
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
=======
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute("data-theme", res.data.theme);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
      return false;
    }
  };

<<<<<<< HEAD
  const register = async (name, email, password, role = 'user') => {
    try {
      setError(null);
      const res = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
=======
  const register = async (name, email, password) => {
    try {
      setError(null);
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute("data-theme", res.data.theme);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
      return false;
    }
  };

  const updateProfile = async (avatar, theme) => {
    try {
<<<<<<< HEAD
      const res = await api.put('/auth/profile', { avatar, theme });
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute('data-theme', res.data.theme);
      }
      return true;
    } catch (err) {
      console.error('Failed to update profile', err);
=======
      const res = await api.put("/auth/profile", { avatar, theme });
      setUser(res.data);
      if (res.data.theme) {
        document.documentElement.setAttribute("data-theme", res.data.theme);
      }
      return true;
    } catch (err) {
      console.error("Failed to update profile", err);
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
      return false;
    }
  };

  const logout = () => {
<<<<<<< HEAD
    localStorage.removeItem('token');
    setUser(null);
    document.documentElement.removeAttribute('data-theme');
=======
    localStorage.removeItem("token");
    setUser(null);
    document.documentElement.removeAttribute("data-theme");
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
<<<<<<< HEAD
        refreshUser,
        api
=======
        api,
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
