import React from 'react';
import Card from './Card'

const CardList = ({ clothes, onItemSelect }) => {
    let filenames = [];
    if (clothes === 'accessories') {
        fetch('http://localhost:5200/getImage/accessories')
        .then(res => res.json())
        .then(res => filenames.append(res))
    } else if (clothes === 'tops') {
        fetch('http://localhost:5200/getImage/tops')
        .then(res => res.json())
        .then(res => filenames.append(res))
    } else if (clothes === 'bottoms') {
        fetch('http://localhost:5200/getImage/bottoms')
        .then(res => res.json())
        .then(res => filenames.append(res))
    } else if (clothes === 'shoes') {
        fetch('http://localhost:5200/getImage/shoes')
        .then(res => res.json())
        .then(res => filenames.append(res))
    }

    let pictures = [];
    for(let i=0; i<filenames.length; i++) {
        fetch(`http://localhost:5200/getPictureWithPath/${filenames[i]}`)
        .then(res => res.json())
        .then(data => pictures.append(data));
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