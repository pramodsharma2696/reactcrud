import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Student extends Component{
    state ={
        students:[],
        loading:true,
    }
    async componentDidMount(){
        const sleep = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );
        await sleep(500);
        const response = await axios.get('http://inovantsolutions.test/api/getallemployee');
        if(response.data.status === 200){
            //console.log(response.data.message)
            this.setState({
                students: response.data.data,
                loading:false,
            });
        }
    }
     deleteStudent = (e, id) => {
        const clickedBtn = e.currentTarget;
        clickedBtn.innerText = 'Deleting..'
        const response = axios.delete(`http://inovantsolutions.test/api/deleteemployee/${id}`); 
        // console.log(response.data)
        clickedBtn.closest('tr').remove();
         swal({
            title: "Success",
            text: "Student deleted successfully",
            icon: "success",
          });
    }
    render(){
        let HTML_TABLE = '';
        if(this.state.loading){
            HTML_TABLE = <tr><td colSpan="4"><h3>Loading...</h3></td></tr>
        }else{
            HTML_TABLE = this.state.students.map( (item, index) =>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                        <Link to={`edit-student/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                        <button type='button' onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm float-end">Delete</button>
                        </td>
                    </tr>
                );
            })
        }
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-7 offset-2">
                        <div className="card">
                            <div className="card-header">
                                <h4>Students Data</h4>
                                <Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                            </div>
                            <div className="card-body">
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                       <tr>
                                            <th>S.No</th>
                                            <th>Student Name</th>
                                            <th>Student Email</th>
                                            <th>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                    {HTML_TABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;