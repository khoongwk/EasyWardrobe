import React from 'react'
import {Button, Card, CardContent, CardMedia, } from '@material-ui/core/';

const ClothesCard = (imgsrc, onDeleteHandler) => (
  <Card>
    <CardContent>
      <CardMedia >
        <img width="350px" height="auto" alt="clothing" src="https://i.picsum.photos/id/609/200/300.jpg?hmac=jkFe_vvVM_tvHdIFYhYtG6uWYznjI6zHzJpfOWfHGiU"/>
      </CardMedia>
      <Button onClick={() => onDeleteHandler(imgsrc)}/>
    </CardContent>
  </Card>
);

export default ClothesCard;