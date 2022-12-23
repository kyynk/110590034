import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// For firebase
import {database} from '../firebase'
import {ref, push, child, update, query, limitToLast, onValue} from "firebase/database";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function PostItem(props) {
  return (
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="img"
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.post}
            </Typography>
            <Typography>
              {props.post}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>);
}

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  getPosts = () => {
    const recentPostsRef = query(ref(database, 'posts'), limitToLast(100));
    /* TODO: use the query() method */
    onValue(recentPostsRef, (snapshot) => {
       let newPosts = []
       snapshot.forEach((childSnapshot) => {
           /* TODO: parse the childSnapshot and use newPosts.push() to
           store the key and the post pair. You can use console.log() first to
           see what childSnapshot looks like. */
         const k = childSnapshot.key;
         const p = childSnapshot.val().post;
         newPosts.push({k, p})
       });
       // Save the newPosts to the state var.
       this.setState({posts: newPosts})
     }, {
       // We only need to fetch once
       onlyOnce: true
     });
  }

  componentDidMount() {
      /* TODO: call the method to get posts */
    this.getPosts();
  }

  render() {
    const listPosts = this.state.posts.map((v) =>
      <PostItem key={v.k.toString()} post={v.p} />
    );
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
             <Typography variant="h6" color="inherit" noWrap>
               Album layout
             </Typography>
        </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Posts
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                lab 11
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {listPosts}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
  }
}
