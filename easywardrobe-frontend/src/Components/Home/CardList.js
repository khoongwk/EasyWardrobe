import React from 'react';
import Card from './Card'

const CardList = ({ clothes, onItemSelect }) => {
    let pictures = [];
    if (clothes === 'accessories') {
        pictures = ['https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg']
    } else if (clothes === 'tops') {
        pictures = ['https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg']
    } else {
    }

    const cardComponent = pictures.map((picture) => {
        return (
        <Card 
            image={picture} onItemSelect={onItemSelect} clothes={clothes}
        />
        )
    })
    return (
    <React.StrictMode>
        {cardComponent}
    </React.StrictMode>
    )
}

export default CardList;