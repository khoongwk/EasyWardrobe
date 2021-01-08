import React from 'react';

class OutfitCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.image === '') {
            return (
                <div>
                    <img alt='clothes' src='http://personal.psu.edu/xqz5228/jpg.jpg'/>
                </div>
            );
        } else {
            return (
                <div>
                    <img alt='clothes' src={this.props.image} />
                </div>
            );
        }
    }
}

export default OutfitCard;

