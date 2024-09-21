import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMovies, getUsers } from "../../../api";
import "fullpage.js/dist/fullpage.min.css"; // Import fullpage.js minified CSS
import fullpage from "fullpage.js/dist/fullpage.min.js"; // Import fullpage.js minified JS
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Pcard from "../Layout/Pcard.js";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 20px;
  margin: 0;
  min-height: 100vh;
  color: white;
`;

const Header = styled.header`
  background: #223;
  padding: 15px;
  margin-top: 2px;
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
  // min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const StatDescription = styled.div`
  font-size: 1rem;
  color: #ccc;
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

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #ccc;
`;

const FullPageSection = styled.div`
  &.section {
    padding: 60px 0;
    height: 100vh;
    box-sizing: border-box;
  }

  &.section:nth-of-type(1) {
    background: linear-gradient(135deg, #1bbc9b, #00aaff);
  }
  &.section:nth-of-type(2) {
    background: linear-gradient(135deg, #4bbfc3, #2a9d8f);
  }
  &.section:nth-of-type(3) {
    background: linear-gradient(135deg, #7baabe, #f39c12);
  }
  &.section:nth-of-type(4) {
    background: linear-gradient(135deg, #f90, #e94e77);
  }
`;

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const getUser = await getUsers();
        setUsers(getUser);
        console.log(users[0].username)
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchMoviesData = async (res, req) => {
      try {
        const fetchedMovies = await fetchMovies();

        setMovies(fetchedMovies);

        // Mock data for the chart
        setChartData([
          { date: "2024-01-01", revenue: 4000 },
          { date: "2024-02-01", revenue: 3000 },
          { date: "2024-03-01", revenue: 2000 },
          { date: "2024-04-01", revenue: 2780 },
          { date: "2024-05-01", revenue: 1890 },
        ]);
      } catch (error) {
        setError("Error fetching movies");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesData();
  }, []);

  useEffect(() => {
    const fullpageInstance = new fullpage("#fullpage", {
      autoScrolling: true,
      scrollHorizontally: true,
      navigation: true,
    });

    return () => {
      if (fullpageInstance) {
        fullpageInstance.destroy("all");
      }
    };
  }, []);

  return (
    <DashboardWrapper id="fullpage">
      <FullPageSection className="section">
        <Header>
          <h1>Dashboard</h1>
          <h1>welcome {users.length >  0  ? users[1].email:'username'}</h1>
        </Header>
        <WidgetsContainer>
          <Widget>
            <Title>Statistics</Title>
            <StatValue>500</StatValue>
            <StatDescription>Total Users</StatDescription>
          </Widget>
          <Widget>
            <Title>Recent Activity</Title>
            <StatValue>120</StatValue>
            <StatDescription>New Comments</StatDescription>
          </Widget>
          <Widget>
            <Title>Notifications</Title>
            <StatValue>45</StatValue>
            <StatDescription>Pending Notifications</StatDescription>
          </Widget>
          <Widget>
            <Title>Analytics</Title>
            <StatValue>30%</StatValue>
            <StatDescription>Conversion Rate</StatDescription>
          </Widget>
        </WidgetsContainer>
      </FullPageSection>
      <FullPageSection className="section">
        <Widget>
          <Title>Revenue Chart</Title>
          <LineChart width={800} height={600} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </Widget>
      </FullPageSection>
      <FullPageSection className="section">
        <Pcard />
      </FullPageSection>
      <FullPageSection className="section">
        <Header>
          <h1>Movies List</h1>
        </Header>
        <MoviesContainer>
          {loading && <LoadingMessage>Loading movies...</LoadingMessage>}
          {error && <LoadingMessage>{error}</LoadingMessage>}
          {!loading &&
            !error &&
            movies.map((movie) => (
              <MovieCard key={movie._id}>
                {movie.posterUrl && (
                  <PosterImage src={movie.posterUrl} alt={movie.title} />
                )}
                <div>{movie.title}</div>
              </MovieCard>
            ))}
        </MoviesContainer>
      </FullPageSection>
    </DashboardWrapper>
  );
};

export default Dashboard;
