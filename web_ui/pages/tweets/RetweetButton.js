import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const Button = withStyles({
  root: {
    margin: '16px 0px',
  },
  paper: {
    padding: '10px',
  },
})(MuiButton);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
  },
}));

const RetweetButton = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); // Controls modal

  const onClick = async (e) => {
    e.preventDefault();
    const tweetId = props.tweetId;
    console.log(tweetId);

    const response = await fetch(`/api/retweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        retweet_id: tweetId,
      }),
    });

    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="standard"
        aria-label="retweet"
        style={{ marginLeft: '10px' }}
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        Retweet
      </Button>
    </>
  );
};

export default RetweetButton;
