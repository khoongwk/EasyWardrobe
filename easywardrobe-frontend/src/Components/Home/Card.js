import React from 'react';

const Card = ({ image, onItemSelect, clothes }) => {
    return (
        <div>
            <img alt='clothes' src={image} onClick={() => onItemSelect(image, clothes)}/>
        </div>
    )
}

export default Card;