import React, {Component} from 'react';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            price :this.props.price,
            furniture_style: this.props.furniture_style,
            description:this.props.description,
            delivery_time:this.props.delivery_time
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{this.props.name}</h5>
                    <p className="card-text text-warning text-right font-weight-bold">
                        Price: ${this.props.price}

                    </p>

                    <p className="card-text">{this.props.description}</p>
                    <br/>
                    <p className="text-primary">Furniture Style</p>
                    <ul>
                        {this.props.furniture_style.map(item => {
                            return <li key={item}> {item}</li>
                        })}
                    </ul>
                    <p className="card-text text-right text-primary font-weight-bold">Delivery days: {this.props.delivery_time} days
                    </p>
                </div>
            </div>
        );
    }

}

export default Card;