import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CustomAppBar(props) {
  const classes = useStyles();

  const handleNavHome = () => {
    props.history.push("/home");
  };

  const handleNavWardrobePage = () => {
    props.history.push("/wardrobe");
  }

  const handleNavOutfitsPage = () => {
    props.history.push("/outfits");
  }

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            EasyWardrobe
          </Typography>
          <Typography>
            <Button onClick={handleNavHome} color="inherit">Create An Outfit</Button>
            <Button onClick={handleNavOutfitsPage} color="inherit">My Outfits</Button>            
            <Button onClick={handleNavWardrobePage} color="inherit">My Wardrobe</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default withRouter(CustomAppBar);