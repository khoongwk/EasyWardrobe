import React from 'react';
import { Button, Grid } from '@material-ui/core';

const Outfit = ({ outfit, onDelete, id }) => {
    return (
        <div>
            <div>
                <Grid> 
                    <img width='200px' height='200px' alt='outfit' src={outfit.top}></img>
                    <img width='200px' height='200px' alt='outfit' src={outfit.bottom}></img>
                </Grid>
                <Grid>
                    <img width='200px' height='200px' alt='outfit' src={outfit.acc}></img>
                    <img width='200px' height='200px' alt='outfit' src={outfit.shoes}></img>
                </Grid>
            </div>
            <Button onDelete={() => onDelete(id)}>Delete</Button>
        </div>
    )
}

export default Outfit;