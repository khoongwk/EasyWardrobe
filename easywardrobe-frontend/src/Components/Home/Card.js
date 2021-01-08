import React from 'react';

const Card = ({ image, onItemSelect, clothes }) => {
    return (
        <div padding='50px'>
            <img
            alt='clothes' width='350px' height='auto' src={image} onClick={() => onItemSelect(image, clothes)}/>
        </div>
    )
}

export default Card;