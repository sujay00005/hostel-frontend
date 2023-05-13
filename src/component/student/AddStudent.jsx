import axios from "axios";
import React, {useEffect, useState} from "react";
import { baseUrl } from "../../constant/constants";
import {useNavigate, useLocation} from "react-router-dom";

function AddStudent(props) {

    let [student, setStudent]=useState({
        altPhone: "",
        dateOfbirth:"",
        blood: "",
        email: "",
        father: "",
        gender: "",
        guardian: "",
        mother: "",
        name: "",
        phone: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const {notification}=location.state;
    //const [studentId,setStudentId] =useState('');

    useEffect(() => {
        console.log("👿😈");
        console.log(notification);
        if(!props.isNew && props.studentId) {
        axios.get(baseUrl+"student/"+props.studentId)
            .then((res) => {
                console.log("😀");

                setStudent((prevData) => {return res.data.data;});
                //setStudentId((prevId) => {return res.data.data._id;}); 
                //console.log("_______"+studentId);
            })
    }
    }, []);

    function handleChange(event) {
        const {name, value}=event.target;

        setStudent((prevData) => {
            return {...prevData, [name]: value}
        });
    }

    function onSubmit() {
        let url=props.isNew? 'http://localhost:5000/add-student':'http://localhost:5000/update-student';

        axios.post(url, student)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {console.log(err);})
        
    }

    function Cancel() {
        navigate(-1);
    }

    function Delete() {
        if(!props.isNew && props.studentId)
        axios.post(baseUrl+"delete-student/"+props.studentId, {})
            .then((res) => {
                console.log("Student Deleted");
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        
        setStudent((prevData) => {
            return {
                altPhone: "",
                dateOfbirth: "",
                blood: "",
                email: "",
                father: "",
                gender: "",
                guardian: "",
                mother: "",
                name: "",
                phone: ""
            }
        });
    }


    return (
        <div>
            <div className="justify-content-between align-items-center row m-5">
                <div className="col mx-auto ms-5">
                    <h3 className="mx-auto mx-5">{props.isNew ? 'Add New': 'Update'} Student</h3>
                </div>
                <div className="col">
                    <button className="btn btn-outline-danger me-2" onClick={()=>{Cancel()}}>Cancel</button>
                    <button className="btn btn-danger" onClick={Delete}>Delete</button>
                </div>
            </div>

            <form>
                
                <div className="form-group px-5 m-5">
                    <div className="mb-4">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            value={student.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dateOfbirth">Date of Birth</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dateOfbirth"
                            placeholder="YYYY-MM-DD"
                            onChange={handleChange}
                            value={student.dateOfBirth}
                            //value={student.dateOfbirth.getFullYear()+"/"+student.dateOfbirth.getMonth()+"/"+student.dateOfbirth.getDate()}
                        />
                    </div>
                    <div className="row">
                        <div className="col mb-4">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={handleChange}
                                value={student.phone}
                                />
                        </div>
                        <div className="col mb-4">
                            <label htmlFor="altPhone">Alternate Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="altPhone" 
                                onChange={handleChange}
                                value={student.altPhone}
                                />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email" 
                            onChange={handleChange}
                            value={student.email}
                            />
                    </div>
                    {/*<select className="form-control">
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <select className="form-control">
                        <option>Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                        <option value="O+">O+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB-">AB-</option>
                        <option value="O-">O-</option>
                    </select>*/}
                    <div className="row">
                    <div className="col mb-4">
                        <label htmlFor="gender">Gender</label>
                        <input
                            className="form-control"
                            type="text"
                            name="gender"
                            onChange={handleChange}
                            value={student.gender}
                        />
                    </div>
                    <div className="col mx-4">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <input
                            className="form-control" type="text"
                            name="bloodGroup"
                            onChange={handleChange}
                            value={student.blood}
                            />
                    </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mothersName">Mother's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="mothersName"
                            onChange={handleChange}
                            value={student.mother}
                            />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fathersName">Father's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fathersName" 
                            onChange={handleChange}
                            value={student.father}
                            />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="localGuardian">Local Guardian</label>
                        <input
                            type="text"
                            className="form-control"
                            name="localGuardian"
                            onChange={handleChange}
                            value={student.guardian}
                        />
                    </div>
                    <button className="btn btn-lg btn-success" onClick={onSubmit} type="submit">{props.isNew?'Save':'Update'}</button>
                </div>
            </form>
        </div>    
    );
}

export default AddStudent;