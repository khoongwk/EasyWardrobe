import React from 'react';
import Card from './Card'

class CardList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    //     let filenames = [];
    //     let pictures = [];
    //     if (this.props.clothes === 'accessories') {
    //         fetch('/getImage/accessories')
    //         .then(res => res.json())
    //         .then(data => filenames.append(data))
    //         for(let i=0; i<filenames.length; i++) {
    //             fetch(`http://localhost:5200/getImage/accessories/${filenames[i]}`)
    //             .then(res => res.json())
    //             .then(data => pictures.append(data));
    //         } 
    //     } else if (this.props.clothes === 'tops') {
    //         fetch('http://localhost:5200/getImage/tops')
    //         .then(res => res.json())
    //         .then(res => filenames.append(res))
    //         for(let i=0; i<filenames.length; i++) {
    //             fetch(`http://localhost:5200/getImage/tops/${filenames[i]}`)
    //             .then(res => res.json())
    //             .then(data => pictures.append(data));
    //         } 
    //     } else if (this.props.clothes === 'bottoms') {
    //         fetch('http://localhost:5200/getImage/bottoms')
    //         .then(res => res.json())
    //         .then(res => filenames.append(res))
    //         for(let i=0; i<filenames.length; i++) {
    //             fetch(`http://localhost:5200/getImage/bottoms/${filenames[i]}`)
    //             .then(res => res.json())
    //             .then(data => pictures.append(data));
    //         } 
    //     } else if (this.props.clothes === 'shoes') {
    //         fetch('http://localhost:5200/getImage/shoes')
    //         .then(res => res.json())
    //         .then(res => filenames.append(res))
    //         for(let i=0; i<filenames.length; i++) {
    //             fetch(`http://localhost:5200/getImage/shoes/${filenames[i]}`)
    //             .then(res => res.json())
    //             .then(data => pictures.append(data));
    //         } 
    // }

    let pictures = [];
    if (this.props.clothes === 'accessories') {
        pictures = ['https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2020/06/10-Best-Aviators-gear-patrol-6.jpg?resize=480:*']
    } else if (this.props.clothes === 'tops') {
        pictures = ['https://kickz.akamaized.net/en/media/images/p/1200/guess-HERO_SEASONAL_WOMAN_CROP_TOP-OPTIC_WHITE-1.jpg',
        'https://cdn.shopify.com/s/files/1/2638/7858/products/3c_2cabc37f-01a1-4d81-89ed-7431d1bf5842.jpg?v=1578598602']
    } else if (this.props.clothes === 'bottoms') {
        pictures = ['https://i.pinimg.com/originals/3c/4e/00/3c4e00ae90a76c51162f95af7994be84.jpg']
    } else if (this.props.clothes === 'shoes') {
        pictures = ['https://media.endclothing.com/media/f_auto,q_auto:eco/prodmedia/media/catalog/product/2/8/28-10-2019_nike_airforce107w_white_315115-112_mb_1.jpg']
    } else {
    }

    const cardComponent = pictures.map((picture) => {
        return (
        <Card 
            padding='10px' margin='100px' image={picture} onItemSelect={this.props.onItemSelect} 
            clothes={this.props.clothes}
        />
        )
    })
    return (
    <React.StrictMode>
        {cardComponent}
    </React.StrictMode>
    )
    }
}
    

export default CardList;