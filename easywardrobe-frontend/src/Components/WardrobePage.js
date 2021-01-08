// Outfits page containing all user-uploaded clothes and functions to upload them.
import React, { Component } from 'react';
import ClothesCategory from './ClothesCategory'
import { Button, Input, Grid, withStyles, Box, Card, CardContent, Typography, CardActions, CardActionArea, CardMedia  } from '@material-ui/core';
import axios from 'axios'

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
      chosenCategory: "Accessories",
      selectedFile: null
    }
    this.categorySwitch = this.categorySwitch.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
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

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('append', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('/backendURL', fd)
    alert('Submitted file!')
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
          <Grid className={this.props.classes.container} container>
            <Grid xs={4} lg={2} item>
              <Card >
                <h2>Upload image</h2>
                <form>
                  <Input type="file" onChange={this.fileSelectedHandler}/>
                  <Button onClick={this.fileUploadHandler}>Upload</Button>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Box>
    )
  }

}

export default withStyles(styles)(WardrobePage)