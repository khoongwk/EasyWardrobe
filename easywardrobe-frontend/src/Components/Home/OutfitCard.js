import React from 'react';

class OutfitCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.image === '') {
            return (
                <div>
                    <img alt='clothes' width='200px' height='150px' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Grey_background.jpg'/>
                </div>
            );
        } else {
            return (
                <div>
                    <img width='200px' height='auto' alt='clothes' src={this.props.image} />
                </div>
            );
        }
    }
}

export default OutfitCard;

