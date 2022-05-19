import React from 'react';
import Table from './table';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TweetCreateButton from './TweetCreateButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function TweetsPage() {
  const classes = useStyles();
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(async () => {
    const response = await fetch(`/api/search`);
    const data = await response.json();

    setSearchResults(data.result);
  }, []);

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Anonymous Twitter
            </Typography>
            <TweetCreateButton />
          </Toolbar>
        </AppBar>
      </div>
      <Table data={searchResults} />
    </div>
  );
}
