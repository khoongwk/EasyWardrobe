import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 10
  },
  Grid: {
      padding: 10,
      alignItems: 'center'
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Accessories</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Tops</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Bottoms</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>Shoes</Paper>
                </Grid>
            </Grid>
            <Grid>
                <Paper className={classes.paper}>Display</Paper>
            </Grid>
        </Grid>
        <Grid className={classes.Grid} item xs={3}>
          <Paper className={classes.paper}>Accessories</Paper>
          <Paper className={classes.paper}>Tops</Paper>
          <Paper className={classes.paper}>Bottoms</Paper>
          <Paper className={classes.paper}>Shoes</Paper>
          <Button> Save </Button>
        </Grid>
      </Grid>
    </div>
  );
}


