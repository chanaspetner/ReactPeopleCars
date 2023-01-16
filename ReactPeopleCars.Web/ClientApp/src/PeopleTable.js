import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from 'react-router-dom';
import PersonRow from './PersonRow';
import axios from 'axios';

class PeopleTable extends React.Component {

    state = {
        people: []
    }

    componentDidMount = () => {
         this.generatePeople();
    }

    generatePeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({
                people: res.data,
            });
        });
    }

    render () {
        return(
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col md-12'>
                    <Link to={`/addperson`}>
                        <button className='btn btn-success btn-lg btn-block'>Add Person</button>
                    </Link>
                    </div>
                </div>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Age</th>
                           <th>Car Count</th>
                           <th>Add Car</th>
                           <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p => <PersonRow 
                                key={p.id}
                                person={p}
                            />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;