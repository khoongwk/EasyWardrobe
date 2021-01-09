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
      selectedFile: null,
      canRefresh: false,
      isSubmitted: false
    }
    this.categorySwitch = this.categorySwitch.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.loadJSON = this.loadJSON.bind(this);
    // this.onDeleteHandler = this.onDeleteHandler.bind(this)
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
    if (this.state.canRefresh) {
      this.setState({clothesFilepaths: Object.values(json)[0], canRefresh: false});
    }
  }

  categorySwitch = (e) => {
    console.log(e.target.value);
    this.setState({ chosenCategory: e.target.value, canRefresh: true });
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  // onDeleteHandler(imgsrc) {
  //   const target_url = 'http://localhost:5200/deleteItem/'
  //   axios.post(target_url, {"image_type": this.state.chosenCategory, "relative_path": imgsrc})
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))
  // }

  // TODO POST to backend.
  fileUploadHandler = () => {
    // const image = new FormData();
    // image.append('image', this.state.selectedFile);
    // const target_url = 'http://localhost:5200/uploadItem/' + this.state.chosenCategory
    // axios.post(target_url, image, {
    //   headers: {
    //     'accept': '*/*',
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then(res => console.log(res))
    // .catch(error => console.log(error.response))
    this.setState({isSubmitted: true})
    alert('Submitted file!')
  }

  get selectedImage() {
    let imgsrc = ""
    if (this.state.chosenCategory === "accessories") {
      imgsrc = "https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2020/06/10-Best-Aviators-gear-patrol-6.jpg?resize=480:*"
    } else if (this.state.chosenCategory === "tops") {
      imgsrc = "https://kickz.akamaized.net/en/media/images/p/1200/guess-HERO_SEASONAL_WOMAN_CROP_TOP-OPTIC_WHITE-1.jpg"
    } else if (this.state.chosenCategory === "bottoms") {
      imgsrc = "https://i.pinimg.com/originals/3c/4e/00/3c4e00ae90a76c51162f95af7994be84.jpg"
    } else {
      imgsrc = "https://media.endclothing.com/media/f_auto,q_auto:eco/prodmedia/media/catalog/product/2/8/28-10-2019_nike_airforce107w_white_315115-112_mb_1.jpg"
    }
    return <Grid xs={4} lg={2} item>
    <Card >
      <CardMedia>
        <img height="150px" src={imgsrc}/>
      </CardMedia>
    </Card>
  </Grid> 
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
            {this.selectedImage}
            {this.state.isSubmitted ?
              <Grid xs={4} lg={2} item>
                <Card >
                  <CardMedia>
                    <img height="150px" src="https://cdn.shopify.com/s/files/1/2638/7858/products/3c_2cabc37f-01a1-4d81-89ed-7431d1bf5842.jpg?v=1578598602"/>
                  </CardMedia>
                </Card>
              </Grid> 
             : null
             }
            
          </Grid>
        </Card>
      </Box>
    )
  }
}

export default withStyles(styles)(WardrobePage)