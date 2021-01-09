import React from 'react';
import Outfit from './Outfit';

class OutfitsList extends React.Component {

    onDelete = (id) => {
        fetch(`/deleteOutfit/${id}`);
    }
    render () {
    //     const outfits = [{
    //         id: 1,
    //         image: {
    //             acc: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             top: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             bottom: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             shoes: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg'
    //         }
    //     },
    //     {
    //         id: 2,
    //         image: {
    //             acc: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             top: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             bottom: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    //             shoes: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg'
    //         }
    //     }
    // ];
    let outfits = [];
        fetch('/getOutfits')
        .then(res => res.json())
        .then(data => outfits.append(data));

        const outfitsDisplay = outfits.map((outfit) => {
            return (
                <Outfit width='300px' outfit={outfit.item} id={outfit.id}
                onDelete={this.onDelete}/>
            )
        })
        return (
            <React.StrictMode>
                {outfitsDisplay}
            </React.StrictMode>
        )
    }
}

export default OutfitsList;

