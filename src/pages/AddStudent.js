import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class AddStudent extends Component{
    state = {
        name:'',
        email:''
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    saveStudent = async(e) =>{
        e.preventDefault();
        const response = await axios.post('http://inovantsolutions.test/api/createemployee', this.state);
        if(response.data.status === 200){
            //console.log(response.data.message)
            swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
              });
            this.setState({
                name:'',
                email:''
            });
        }
    }
    render(){
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 offset-3">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Students</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} id="name" placeholder='name..' className='form-control' />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} id="email" placeholder='email..' className='form-control' />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type='submit' className='btn btn-primary'>Save Student</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStudent;