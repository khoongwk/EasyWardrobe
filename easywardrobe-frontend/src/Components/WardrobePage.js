// Outfits page containing all user-uploaded clothes and functions to upload them.

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
      <Box>
        <Card>
          <CardContent>
          <Typography>
          </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }

}

export default withStyles(styles)(WardrobePage)