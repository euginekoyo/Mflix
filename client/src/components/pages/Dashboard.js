// Dashboard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchMovies } from '../../api';

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 50, 1) 0%, rgba(0, 0, 0, 1) 100%);
  min-height: 100vh;
  color: white;
`;

const Header = styled.header`
  background: #223;
  padding: 15px;
  margin-top: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  text-align: center;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Widget = styled.div`
  background: #2e2e2e;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const MoviesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MovieCard = styled.div`
  background: #3a3a3a;
  border-radius: 8px;
  padding: 10px;
  flex: 1;
  min-width: 150px;
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PosterImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMoviesData();
  }, []);

  return (
    <DashboardWrapper>
      <Header>
        <h1>Dashboard11</h1>
      </Header>
      <WidgetsContainer>
        <Widget>
          <Title>Statistics</Title>
          {/* Add content or components for statistics */}
        </Widget>
        <Widget>
          <Title>Recent Activity</Title>
          {/* Add content or components for recent activity */}
        </Widget>
        <Widget>
          <Title>Notifications</Title>
          {/* Add content or components for notifications */}
        </Widget>
        <Widget>
          <Title>Analytics</Title>
          {/* Add content or components for analytics */}
        </Widget>
      </WidgetsContainer>
      <MoviesContainer>
        {movies.map((movie) => (
          <MovieCard key={movie._id}>
            {movie.posterUrl && (
              <PosterImage src={movie.posterUrl} alt={movie.title} />
            )}
            <div>{movie.title}</div>
          </MovieCard>
        ))}
      </MoviesContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
