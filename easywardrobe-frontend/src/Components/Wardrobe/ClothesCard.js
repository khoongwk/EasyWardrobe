import React from 'react'
import {Button, Card, CardContent, CardMedia, } from '@material-ui/core/';

const ClothesCard = (imgsrc, onDeleteHandler) => (
  <Card>
    <CardContent>
      <CardMedia >
        <img width="350px" height="auto" src={imgsrc}/>
      </CardMedia>
      <Button onClick={onDeleteHandler(imgsrc)}/>
    </CardContent>
  </Card>
);

export default ClothesCard;