import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

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

const TweetCreateButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); // Controls modal

  const onSubmit = async (e) => {
    e.preventDefault();
    const contentValue = event.target.elements.content.value;

    const response = await fetch(`/api/tweets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: contentValue,
      }),
    });

    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="contained"
        aria-label="create"
        style={{ marginLeft: '10px' }}
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Create a Tweet
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Tweet</DialogTitle>
        <DialogContent>
          <Box className={classes.paper}>
            <form onSubmit={onSubmit}>
              <div>
                <TextField
                  variant="standard"
                  name="content"
                  label="What's happening"
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TweetCreateButton;
