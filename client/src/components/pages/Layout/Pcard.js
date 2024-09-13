import * as React from 'react';
import { useState, useEffect } from 'react'; // Import useEffect
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchMovies } from '../../../api';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: { expand: false },
      style: { transform: 'rotate(0deg)' },
    },
    {
      props: { expand: true },
      style: { transform: 'rotate(180deg)' },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="movie">
      {movies.length > 0 ? movies[0].title.charAt(0) : 'M'}
    </Avatar>
  }
  action={
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  }
  title={movies.length > 0 ? movies[0].title : 'No Title'}
  subheader={movies.length > 0 ? new Date(movies[0].releaseDate).toLocaleDateString() : 'No Release Date'}
/>

      <CardMedia
        component="img"
        height="194"
        image={movies.length > 0 ? movies[0].posterUrl : 'default.jpg'} // Handle image source safely
        alt="Paella dish"
      />
     <CardContent>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    In the highly anticipated finale of "Stranger Things," the stakes reach their peak as the kids face their most dangerous challenge yet. The season wraps up with intense showdowns, emotional farewells, and revelations that change the course of their lives. As the Upside Down encroaches on Hawkins, the friends must confront their deepest fears and work together to save their town from ultimate destruction.
  </Typography>
</CardContent>
<CardActions disableSpacing>
<IconButton aria-label="add to favorites" sx={{ color: 'red' }}>
  <FavoriteIcon />
</IconButton>
<IconButton aria-label="share" sx={{ color: 'blue' }}>
  <ShareIcon />
</IconButton>

  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <ExpandMoreIcon />
  </ExpandMore>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography sx={{ marginBottom: 2 }}>Episode Details:</Typography>
    <Typography sx={{ marginBottom: 2 }}>
      The finale kicks off with the team devising a daring plan to defeat the forces of the Upside Down. As tensions rise, unexpected alliances form and long-standing mysteries are unveiled. With a dramatic climax and poignant resolutions, the episode delivers both heart-pounding action and emotional depth.
    </Typography>
    <Typography>
      Fans are left on the edge of their seats as the characters’ fates hang in the balance. The episode concludes with a mix of hope and uncertainty, setting the stage for future adventures in the beloved series.
    </Typography>
  </CardContent>
</Collapse>


    </Card>
  );
}
