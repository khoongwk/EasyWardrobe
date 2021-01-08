// Outfits page containing all user-uploaded clothes and functions to upload them.
import React, { Component } from 'react';
import ClothesCategory from './ClothesCategory'
import plusSign from '../plusSign.png'
import { Grid, withStyles, Box, Card, CardContent, Typography, CardActions, CardActionArea, CardMedia  } from '@material-ui/core';

const styles = {
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    margin: '5vh'
  },
  bg: {
    backgroundPosition: 'center',
    backgroundSize: 'auto auto cover',
    backgroundRepeat: 'repeat-y',
    backgroundAttachment: 'fixed'
  }
};

class WardrobePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clothesData: [],
      chosenCategory: "Accessories"
    }
    this.categorySwitch = this.categorySwitch.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  // TODO fetch and process wardrobe data.
  componentDidMount() {
    fetch('/clothesData')
      .then(data => data.json())
      .then(clothes => this.setState({ clothesData: clothes }))
  }

  categorySwitch = (e) => {
    console.log(e.target.value);
    this.setState({ chosenCategory: e.target.value });
  }

  handleUploadClick = () => {
    alert("Upload clicked.")
  }

  render() {
    return (
      <Box className={this.props.classes.bg}>
        <Card className={this.props.classes.container}>
          <Grid xs={10} lg={8} item>
          <CardContent>
          <Typography>
            <h1>My wardrobe clothes:</h1>
          </Typography>
          </CardContent>
          <CardActions>
              <ClothesCategory handleCategoryChange={this.categorySwitch} />
          </CardActions>
          </Grid>
        </Card>

        <Card className={this.props.classes.container}>
          <Grid className={this.props.classes.container}  xs={4} lg={2} item>
          <Card >
            <CardActionArea onClick={this.handleUploadClick}>
              <h2>Upload image</h2>
              <CardMedia component='img' src={plusSign} />
            </CardActionArea>
          </Card>
          </Grid>
        </Card>
      </Box>
    )
  }

}

export default withStyles(styles)(WardrobePage)