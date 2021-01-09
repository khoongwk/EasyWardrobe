// Outfits page containing all user-uploaded outfits and functions to delete them.

import React, { Component } from 'react';
import OutfitsList from './OutfitsList';
import Outfit from './Outfit'
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

  constructor(props) {
    super(props)
    this.state = {
      outfitsJSON: []
    }
  }

  // componentDidMount() {
  //   fetch('/getOutfits').then(res => res.json()).then(data => this.setState({outfitsJSON: data}))
  // }

  // get savedOutfits() {
  //   console.log(this.state.outfitsJSON);
  //   if (this.state.outfitsJSON.length === 0) {
  //     console.log("returning undefined.");
  //     return undefined;
  //   } else {
  //     console.log("Returning entire JSON")
  //     return this.state.outfitsJSON
  //   }
  // }

  render() {
    return (
      <Box className={this.props.classes.bg}>
        <Card className={this.props.classes.container}>
          <Typography>
            <h1>My saved outfits</h1>
            <OutfitsList />
          </Typography>
        </Card>
        <Grid className={this.props.classes.container}
           id="introduction" justify="center" container>
          <Grid xs={10} lg={8} spacing={2} justify="center" container>
            {/* {
              this.savedOutfits
                ? this.savedOutfits["outfits"].map(file => <Outfit outfit={file["items"]} id={file["outfit_id"]}/>)                
                : null
            } */}
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default withStyles(styles)(OutfitsPage)