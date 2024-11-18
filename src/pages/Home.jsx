import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }

  return (
    <div className="home">
        <h1>Hello World</h1>
        <a href="/login">Login</a>
    </div>
  );
};

export default Home;