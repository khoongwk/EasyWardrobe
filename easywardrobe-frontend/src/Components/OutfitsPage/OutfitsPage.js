// Outfits page containing all user-uploaded outfits and functions to delete them.

import React, { Component } from 'react';
import OutfitsList from './OutfitsList';
import { Grid, withStyles, Box, Card, CardContent, Typography, CardActions } from '@material-ui/core';

const styles = {
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: '5vh'
  },
  bg: {
    backgroundPosition: 'center',
    backgroundSize: 'auto auto cover',
    backgroundRepeat: 'repeat-y',
    backgroundAttachment: 'fixed',
    margin: '5vh'
  }
};

class OutfitsPage extends Component {

  render() {
    return (
      <Box className={this.props.classes.bg}>
        <Card className={this.props.classes.container}>
          <Typography>
            <h1>My saved outfits</h1>
            <OutfitsList />
          </Typography>
        </Card>
        <Grid container>
          <Card>
            <Grid item></Grid>
          </Card>
        </Grid>
      </Box>
    )
  }
}

export default withStyles(styles)(OutfitsPage)