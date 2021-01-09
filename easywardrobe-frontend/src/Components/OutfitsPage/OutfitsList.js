import React from 'react';
import Outfit from './Outfit';

class OutfitsList extends React.Component {
    constructor() {
        super();
        this.state = {
            deleted: false
        }
    }

    onDelete = (id) => {
        this.setState({ deleted: true })
        // fetch(`/deleteOutfit/${id}`);

    }
    render () {
        const outfits = [{
            id: 1,
            items: {
                acc: 'https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2020/06/10-Best-Aviators-gear-patrol-6.jpg?resize=480:*',
                top: 'https://kickz.akamaized.net/en/media/images/p/1200/guess-HERO_SEASONAL_WOMAN_CROP_TOP-OPTIC_WHITE-1.jpg',
                bottom: 'https://i.pinimg.com/originals/3c/4e/00/3c4e00ae90a76c51162f95af7994be84.jpg',
                shoes: 'https://media.endclothing.com/media/f_auto,q_auto:eco/prodmedia/media/catalog/product/2/8/28-10-2019_nike_airforce107w_white_315115-112_mb_1.jpg'
            }
        }
    ];
    // let outfits = [];
    //     fetch('/getOutfits')
    //     .then(res => res.json())
    //     .then(data => outfits.append(data));

        // const outfitsDisplay = outfits.map((outfit) => {
        //     return (
        //         <Outfit width='300px' outfit={outfit.item} id={outfit.id}
        //         onDelete={this.onDelete}/>
        //     )
        // })

        const outfitsDisplay = outfits.map((outfit) => {
            return (
                <Outfit width='300px' height='300px' outfit={outfit.items} id={outfit.id}
                onDelete={this.onDelete}/>
            )
        })

        if (!this.state.deleted) {
        return (
            <React.StrictMode>
                {outfitsDisplay}
            </React.StrictMode>
        )} else {
            return (
                <h2> No Outfits! </h2>
            )
        }
    }
}

export default OutfitsList;

