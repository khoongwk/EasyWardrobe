import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { CardActionArea} from '@material-ui/core';
import CardList from './CardList';
import OutfitCard from './OutfitCard';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    margin: 10
  },
  Grid: {
      padding: 10,
      alignItems: 'stretch'
  }
};

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            clothes: '',
            aImage: '',
            tImage: '',
            bImage: '',
            sImage: ''
        }
    }

    onAccessoriesClick = () => {
        this.setState({ clothes: 'accessories'})
    }

    onTopsClick = () => {
        this.setState({ clothes: 'tops'})
    }

    onBottomsClick = () => {
        this.setState({ clothes: 'bottoms'})
    }

    onShoesClick = () => {
        this.setState({ clothes: 'shoes'})
    }

    onItemSelect = (imageInput, clothesType) => {
        if (clothesType === 'accessories') {
            this.setState({ aImage: imageInput })
        } else if (clothesType === 'tops') {
            this.setState({ tImage: imageInput })
        } else if (clothesType === 'bottoms') {
            this.setState({ bImage: imageInput })
        } else if (clothesType === 'shoes') {
            this.setState({ sImage: imageInput })
        } else {
            console.log("Error!!!");
        }
    }

    onOutfitSave = () => {
        // fetch('/addOutfit', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         aImage: this.state.aImage,
        //         tImage: this.state.tImage,
        //         bImage: this.state.bImage,
        //         sImage: this.state.sImage
        //     })
        // }).then(res => res.json())
        // .then(data => {
        //     if (data === "Outfit inserted successfully into outfits table") {
        //         this.setState({ aImage: '', bImage: '', tImage:'', sImage:''})
        //     }
        // })
        
    }

    render() {
        return (
            <div className={this.props.classes.root}>
              <Grid container spacing={30}>
                <Grid item xs={9}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <CardActionArea>
                                <Paper onClick={this.onAccessoriesClick}
                                className={this.props.classes.paper}>Accessories</Paper>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={3}>
                            <CardActionArea>
                                <Paper onClick={this.onTopsClick}
                                className={this.props.classes.paper}>Tops</Paper>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={3}>
                            <CardActionArea>
                                <Paper onClick={this.onBottomsClick}
                                className={this.props.classes.paper}>Bottoms</Paper>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={3}>
                            <CardActionArea>
                                <Paper onClick={this.onShoesClick}
                                className={this.props.classes.paper}>Shoes</Paper>
                            </CardActionArea>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <CardList clothes={this.state.clothes} onItemSelect={this.onItemSelect}/>
                    </Grid>
                </Grid>
                <Grid className={this.props.classes.Grid} item xs={3}>
                  <OutfitCard className={this.props.classes.paper} image={this.state.aImage}/>
                  <OutfitCard className={this.props.classes.paper} image={this.state.tImage}/>
                  <OutfitCard className={this.props.classes.paper} image={this.state.bImage}/>
                  <OutfitCard className={this.props.classes.paper} image={this.state.sImage}/>
                  <Button onClick={this.onOutfitSave}> Save </Button>
                </Grid>
              </Grid>
            </div>
          );
    }
}
export default withStyles(useStyles)(Home)

