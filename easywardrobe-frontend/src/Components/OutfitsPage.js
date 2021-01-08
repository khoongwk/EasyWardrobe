// Outfits page containing all user-uploaded outfits and functions to delete them.

import React, { Component } from 'react';
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

class WardrobePage extends Component {

  render() {
    return (
      <Box className={this.props.classes.bg}>
        <Card className={this.props.classes.container}>
          <Typography>
            <h1>My saved outfits</h1>
          </Typography>
        </Card>
      </Box>
    )
  }
}

export default withStyles(styles)(WardrobePage)