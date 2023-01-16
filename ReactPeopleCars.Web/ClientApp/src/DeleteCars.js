import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import CarRow from './CarRow';
import { Link } from 'react-router-dom';

class DeleteCars extends React.Component {

    state = {
        cars: [], 
        personId: ''
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        axios.get(`/api/people/getallcars?id=${id}`).then(res => {
            this.setState({
                cars: res.data,
            });
        });

    }

    onYesClick = async () => {
        const { id } = this.props.match.params;
        await axios.post(`api/people/deletecars?id=${id}`);
        this.props.history.push('/'); 
    }

    render() {
        return(
            <div className='container mt-5'>
                <table className='table table-hover table-striped table-borderd'>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c => <CarRow
                            key={c.id}
                            car={c}
                            />)}
                    </tbody>
                </table>
                <div className='row'>
                    <h1>Are you sure you want to delete all fo these cars?</h1>
                </div>
                <div className='row'>
                    <div className='col md-6'>
                    <Link to="/">
                        <button className='btn btn-primary btn-lg btn-block'>No</button>
                    </Link>
                    </div>
                    <div className='col md-6'>
                        <button onClick={this.onYesClick} className='btn btn-danger btn-lg btn-block'>Yes</button>
                    </div>
                </div>               
            </div>
        )
    }
}

export default DeleteCars;