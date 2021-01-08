// Outfits page containing all user-uploaded clothes and functions to upload them.
import React, { Component } from 'react';
import ClothesCategory from './ClothesCategory'
import ClothesCard from './ClothesCard'
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
      clothesFilepaths: [],
      chosenCategory: "accessories",
      selectedFile: null
    }
    this.categorySwitch = this.categorySwitch.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.loadJSON = this.loadJSON.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  // TODO fetch and process wardrobe data.
  componentDidMount() {
    const target_url = 'http://localhost:5200/getImage/' + this.state.chosenCategory 
    fetch(target_url)
      .then(data => data.json())
      .then(clothesJSON => this.loadJSON(clothesJSON))
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  componentDidUpdate() {
    const target_url = 'http://localhost:5200/getImage/' + this.state.chosenCategory 
    fetch(target_url)
      .then(data => data.json())
      .then(clothesJSON => this.loadJSON(clothesJSON))
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }


  loadJSON(json) {
    const category = Object.keys(json[0])
    if (category === "accessories") {
      this.setState({clothesFilepaths: Object.values(json)[0]})
    }
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

  onDeleteHandler(imgsrc) {
    const target_url = 'http://localhost:5200/deleteItem/'
    axios.post(target_url, {"image_type": this.state.chosenCategory, "relative_path": imgsrc})
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  // TODO POST to backend.
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('append', this.state.selectedFile, this.state.selectedFile.name);
    const target_url = 'http://localhost:5200/uploadItem/' + this.state.chosenCategory
    axios.post(target_url, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
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

              {this.state.clothesFilepaths.map(
                filePath => <ClothesCard imgsrc={filePath} onDeleteHandler={this.onDeleteHandler}/>
              )}

            </Grid>
          </Grid>
        </Card>
      </Box>
    )
  }
}

export default withStyles(styles)(WardrobePage)