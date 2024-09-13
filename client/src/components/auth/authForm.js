// src/components/AuthForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../context/authContext';
import Loader from './loading';
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #282;
  animation: ${slideIn} 0.5s ease-out;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

const ToggleLink = styled.p`
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const { isAuthenticated, isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use environment variable

  // Redirect authenticated users away from the auth form
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Update state or context with user data
        setUsername(user.username);
        setEmail(user.email);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isSignup 
        ? `${API_BASE_URL}/api/auth/signup`
        : `${API_BASE_URL}/api/auth/login`;
      const data = isSignup 
        ? { username, email, password, role } 
        : { email, password };

      const response = await axios.post(url, data);

      if (isSignup && response.data.isAuthenticated) {
        alert('Signup successful');
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
        navigate('/dashboard'); // Redirect to login page after signup
      } else {
        if (response.data.isAuthenticated) {
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
          await login(email, password); // Update auth context
          navigate(isAdmin ? '/Adashboard' : '/dashboard'); // Navigate based on role
        } else {
          navigate('/authForm');
          alert('Login failed'); // Notify user if login fails
        }
      }
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} failed:`, error.response ? error.response.data : error.message);
      alert(`${isSignup ? 'Signup' : 'Login'} failed: ${error.response ? error.response.data.message : error.message}`);
    }
    finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <FormContainer>
      <FormTitle>{isSignup ? 'Sign Up' : 'Login'}</FormTitle>
      <form onSubmit={handleSubmit}>
      {loading && <Loader />}
        {isSignup && (
          <>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              {/* <option value="admin">Admin</option> */}
            </Select>
          </>
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{isSignup ? 'Sign Up' : 'Login'}</Button>
        <ToggleLink onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
        </ToggleLink>
        <Link className="btn mt-5 btn-outline-primary btn-sm" to={'/dashboard'}> Guest</Link>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
