import React, {Component} from 'react';
import Card from "./product/Card";
import Select from 'react-select'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

//criteria Filtering delivery time
const options_time = [
    {value: '7', label: '1 week'},
    {value: '14', label: '2 week'},
    {value: '21', label: '3 week'},
    {value: '28', label: '4 week'},
    {value: '29', label: 'more '}
];

//criteria filtering furniture style
const options_style = [
    {label: 'Classic ', value: "Classic"},
    {label: 'Midcentury', value: "Midcentury"},
    {label: 'Scandinavian', value: "Scandinavian"},
    {label: 'Modern', value: "Modern"},
    {label: 'Contemporary', value: "Contemporary"},
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source_data_products: [],
            furniture_styles: [],
            products: [],
            selectedTime: null,
            selectedStyle: null,
        }

        this.filterList = this.filterList.bind(this);
        // this.filterSelect = this.filterStyle.bind(this);
    }

    filterStyle = (selectedStyle) => {
        this.setState({selectedStyle});
        console.log(selectedStyle.value);
    }

    filterTime = selectedTime => {
        this.setState({selectedTime});
        console.log(`Option selected:`, selectedTime.value);

        let products = this.state.source_data_products;
        let keysearch = 0;

        var productfiltered = [];

        var days = [];
        if (selectedTime.value >= 1 && selectedTime.value <= 7) {
            days = [1, 2, 3, 4, 5, 6, 7]
        } else if (selectedTime.value >= 7 && selectedTime.value <= 14) {
            days = [8, 9, 10, 11, 12, 13, 14]
        } else if (selectedTime.value >= 14 && selectedTime.value <= 21) {
            days = [15, 16, 17, 18, 19, 20, 21]
        } else if (selectedTime.value >= 21 && selectedTime.value <= 28) {
            days = [22, 23, 24, 25, 26, 27, 28]
        } else if (selectedTime.value >= 28) {
            days = [29, 30, 31]
        }

        console.log(days)

        productfiltered = products.filter(function (el) {
            let arrLength = days.length;
            var day = 0;
            for (let i = 0; i < arrLength; i++) {
                if (days[i] === el.delivery_time) {
                    day = el.delivery_time;
                }
            }
            console.log(day)
            return el.delivery_time === day;

        });
        //console.log(productfiltered)
        this.setState({
            products: productfiltered,
        });
    };


    //filter event
    filterList(e) {
        let products = this.state.source_data_products;
        let keysearch = e.target.value.toLowerCase();

        console.log(this.state.products)
        var productfiltered = [];
        productfiltered = products.filter(function (el) {
            return el.name.toLowerCase().search(keysearch) !== -1
        });
        console.log(productfiltered)
        this.setState({
            products: productfiltered,
        });

    }

    componentDidMount() {

        fetch('https://www.mocky.io/v2/5c9105cb330000112b649af8')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    furniture_styles: data.furniture_styles,
                    products: data.products,
                    source_data_products: data.products,
                })
            })
            .catch(console.log)

    }


    render() {
        const {selectedTime} = this.state;
        const {selectedStyle} = this.state;
        return (
            <div className="container">
                <div className="jumbotron bg-primary">
                    <h3 className="text-warning font-italic">Katalog product</h3>
                    <span className="row">
                        <span className="col-md-4">
                            <input className="form-control" type="search" placeholder="Search Furniture"
                                   aria-label="Search" onChange={this.filterList}/>
                        </span>
                    </span>
                    <br/>
                    <span className="row">
                        <span className="col-md-6">
                            <ReactMultiSelectCheckboxes value={selectedStyle} options={options_style}
                                                        onChange={this.filterStyle}/>

                        </span>
                        <span className="col-md-2"></span>
                        <span className="col-md-4 pull-right">
                            <Select placeholder="Delivery Time" value={selectedTime}
                                    onChange={this.filterTime}
                                    options={options_time}/>
                        </span>
                    </span>

                </div>


                <div className="card-deck">
                    {
                        this.state.products.map((product, i) => (
                            <div key={i} className="col-md-4">
                                <Card furniture_style={product.furniture_style} name={product.name}
                                      price={product.price} delivery_time={product.delivery_time}
                                      description={product.description}/><br/>
                            </div>
                        ))
                    }
                </div>


                <footer className="page-footer font-small bg-primary blue">

                    <div className="footer-copyright text-center py-3"><p className="text-warning"> © 2020 Copyright:
                        <a href="#" className="text-warning"> <br/> Ade Pamungkas</a></p>
                    </div>


                </footer>
            </div>
        );
    }
}

export default App;