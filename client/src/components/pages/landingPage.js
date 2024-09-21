// src/components/LandingPage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/pexels-suissounet-1200450.jpg'; // Adjust the path as needed

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #282c34;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

const GradientText = styled.h1`
  background: linear-gradient(90deg, #ff0000, #0000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <Heading>M-Flix</Heading>
      <SubHeading>Your ultimate movie management solution</SubHeading>
      <Link to="/authForm"><Button>Get Started</Button></Link>
      
    </LandingContainer>
  );
};

export default LandingPage;
