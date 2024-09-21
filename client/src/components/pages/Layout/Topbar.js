import React, { useState } from 'react';
import styled from 'styled-components';
import {FaUserEdit, FaSearch, FaBars } from 'react-icons/fa';
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from 'react-router-dom';
const TopbarWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(135deg, red, blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (max-width: 1200px) {
    padding: 0 15px;
  }

  @media (max-width: 992px) {
    height: 50px;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 8px;
  }

  @media (max-width: 576px) {
    height: 40px;
    padding: 0 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ isFocused }) => (isFocused ? '0' : '1')};
  transition: opacity 0.3s ease;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  transition: width 0.3s ease;
  width: ${({ isFocused }) => (isFocused ? '200px' : '40px')};
  overflow: hidden;

  input {
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 4px;
    outline: none;
    background: #333;
    color: white;
    opacity: ${({ isFocused }) => (isFocused ? '1' : '0')};
    transition: opacity 0.3s ease;
  }

  svg {
    margin-left: 10px;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const ToggleButton = styled.div`
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 20px; /* Adjust this value to position the button */
  transform: translateY(-50%);
  z-index: 2000;
`;

const ProfilePhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left:20px;
  background-image: url('pexels-rickyrecap-2240571.jpg'); /* Replace with your profile photo URL */
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  cursor: pointer;
  position: relative;
`;

const Popover = styled.div`
  position: absolute;
  top: 50px; /* Adjust position according to your design */
  right: 0;
  width: 250px;
  background: white;
  color: black;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  z-index: 3000;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-weight: bold;
  }
    
`;

const Topbar = ({ toggleSidebar }) => {
 
  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleProfileClick = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <TopbarWrapper>
      <ToggleButton onClick={toggleSidebar}>
        <FaBars />
      </ToggleButton>
      <Container>
        <Logo isFocused={isFocused}>M-Flix</Logo>
      </Container>
      <SearchBox isFocused={isFocused}>
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <FaSearch onClick={() => setIsFocused(!isFocused)} />
      </SearchBox>
      <ProfilePhoto onClick={handleProfileClick}>
        <Popover isVisible={isPopoverVisible}>
          <img src="pexels-rickyrecap-2240571.jpg" alt="Profile" /> {/* Replace with your profile photo URL */}
          <p>John Doe</p> {/* Replace with dynamic username */}
          <FaUserEdit /><Link className=" btn">  Profile</Link> {/* Replace with your edit profile button */}
          <HiOutlineLogout /><Link  className="btn">Logout</Link> {/* Replace with your logout button */}
        </Popover>
      </ProfilePhoto>
    </TopbarWrapper>
  );
};

export default Topbar;
