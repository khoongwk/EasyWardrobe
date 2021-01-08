import React from 'react';
import Card from './Card'

const CardList = ({ clothes, onItemSelect }) => {
    let pictures = [];
    if (clothes === 'accessories') {
        pictures = ['https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://minons.files.wordpress.com/2014/09/cropped-chiquita-dm2-minion-dave-bananas.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg']
    } else if (clothes === 'tops') {
        pictures = ['https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg']
    } else {
    }

    const cardComponent = pictures.map((picture) => {
        return (
        <Card 
            padding='10px' margin='100px' image={picture} onItemSelect={onItemSelect} clothes={clothes}
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