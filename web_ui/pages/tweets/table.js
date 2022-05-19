import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RetweetButton from './RetweetButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },

  table: {
    padding: theme.spacing(5),
    minWidth: 650,
  },
}));

var rows = [];

function SimpleTable(props) {
  rows = props.data;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>tweet ID</TableCell>
            <TableCell>content</TableCell>
            <TableCell>Retweet count</TableCell>
            <TableCell>created</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows &&
            rows.length !== 0 &&
            rows.map((row) => (
              <TableRow key={row['_id']}>
                <TableCell>{row['_id']}</TableCell>
                <TableCell>{row['content'][0]['content']}</TableCell>
                <TableCell>{row['count']}</TableCell>
                <TableCell>{row['content'][0]['createdAt']}</TableCell>
                <TableCell>
                  <RetweetButton tweetId={row['_id']}/>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;
