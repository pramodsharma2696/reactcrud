import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class EditStudent extends Component{
    state = {
        id:'',
        name:'',
        email:''
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    async componentDidMount(){
       const student = this.props.params;
       const response = await axios.get(`http://inovantsolutions.test/api/singleemployee/${student.id}`);
        if(response.data.status === 200){
            console.log(response.data)
            this.setState({
                id:student.id,
                name:response.data.data.name,
                email:response.data.data.email
            });
        }

    }
    updateStudent = async(e) =>{
        e.preventDefault();
        const sleep = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );
        document.getElementById('updateBtn').disabled=true;
        document.getElementById('updateBtn').innerHTML='Updating...';
        const response = await axios.post('http://inovantsolutions.test/api/updateemployee', this.state);
        if(response.data.status === 200){
            swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
              });
            await sleep(1000);
            //console.log(response.data.message)
            //document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">'+response.data.message+'</div>';
            document.getElementById('updateBtn').disabled=false;
            document.getElementById('updateBtn').innerHTML='Update Student';
           // await sleep(1000);
           // document.getElementById('alert').innerHTML = "";
        }
    }
    render(){
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 offset-3">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Students</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateStudent}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} id="name" placeholder='name..' className='form-control' />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} id="email" placeholder='email..' className='form-control' />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type='submit' className='btn btn-primary' id='updateBtn'>Update Student</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <span id='alert'></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(EditStudent);