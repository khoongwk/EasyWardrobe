import React from 'react';
import { Button, Grid } from '@material-ui/core';

const Outfit = ({ outfit, onDelete, id }) => {

    outfit.map(clothing => {
        return (
        fetch(`http://localhost:5200/getOutfits/${clothing}`)
            .then(res => res.json())
        );
    });

    return (
        <div>
            <div>
                <Grid> 
                    <img width='200px' height='200px' alt='outfit' src={outfit[1]}></img>
                    <img width='200px' height='200px' alt='outfit' src={outfit[3]}></img>
                </Grid>
                <Grid>
                    <img width='200px' height='200px' alt='outfit' src={outfit[0]}></img>
                    <img width='200px' height='200px' alt='outfit' src={outfit[4]}></img>
                </Grid>
            </div>
            <Button onDelete={() => onDelete(id)}>Delete</Button>
        </div>
    )
}

export default Outfit;