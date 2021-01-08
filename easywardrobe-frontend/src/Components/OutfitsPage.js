// Outfits page containing all user-uploaded outfits and functions to delete them.

import React, { Component } from 'react';
import { Grid, withStyles, Box, Card, CardContent, Typography, CardActions } from '@material-ui/core';

const styles = {
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: '5vh'
  }
};

class WardrobePage extends Component {

  render() {
    return (
      <Box className={this.props.classes.bg}>
        <Typography>
          <h1>My saved outfits</h1>
        </Typography>
      </Box>
    )
  }
}

export default withStyles(styles)(WardrobePage)