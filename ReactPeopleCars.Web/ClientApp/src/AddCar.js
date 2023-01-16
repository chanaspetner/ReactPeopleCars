import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddCar extends React.Component {

    state = {
        car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        },
        personName: ''
    }

    componentDidMount =  () => {
        const { id } = this.props.match.params;
        const nextState = produce(this.state, draftState => {
            draftState.car.personId = id
        });
        this.setState(nextState);

        axios.get(`/api/people/getnamebyid?id=${id}`).then(res => {
            this.setState({
                personName: res.data,
            })
        });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/people/addcar', this.state.car);
        this.props.history.push('/'); 
    }

    render() {
        const { make, model, year } = this.state.car;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h2>Add a car for {this.state.personName}</h2>
                    <input type="text" name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text"  name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text"  name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default AddCar;
