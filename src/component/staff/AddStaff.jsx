import axios from "axios";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../../constant/constants";

function AddStaff(props) {

    let [staff, setStaff]=useState({
        name: "",
        role: "",
        gender: "",
        dateOfBirth:"",
        phone: "",
        altPhone: "",
        email: "",
        bloodGroup: "",
        //address: {
        //    houseNumber: "",
        //    locality: "",
        //    dist: "",
        //    state: "",
        //    pin: ""
        //}
    });

    useEffect(() => {
        if(!props.isNew&&props.staffId) {
            axios.get(baseUrl+"staff/"+props.staffId)
                .then((res) => {
                    console.log("😀");

                    setStaff((prevStaff) => {
                        return res.data.data;
                    });
                    console.log(staff);
                })
        }
    },[]);

    function handleChange(event) {
        const {name, value}=event.target;

        setStaff((prevData) => {
            //if(name==="houseNumber"||name==="locality"||name==="dist"||name==="state"||name==="pin") {
            //    const newStaff={...prevData};
            //    newStaff.address[name]=value;
                
            //    return newStaff;
            //}
            return {...prevData, [name]: value}
        });   
    }

    function onSubmit() {
        let url=props.isNew? baseUrl+"add-staff":baseUrl+"update-staff/"+props.staffId;

        axios.post(url, staff)
            .then((res) => {
                console.log(res);
            })
            .catch(err=>console.log(err));
    }

    function Cancel() {
        
    }

    function Delete() {
        console.log("😃"+props.staffId)
        if(!props.isNew && props.staffId!=="") {
            axios.post(baseUrl+"delete-staff/"+props.staffId, {})
                .then((res) => {
                console.log("Student Deleted");
                console.log(res);
                }).catch((err) => {
                    console.log("Have ERROR now");
                console.log(err);
            });
        }
        
        setStaff((prevData) => {
            return {
                name: "",
                role: "",
                gender: "",
                dateOfBirth:"",
                phone: "",
                altPhone: "",
                email: "",
                bloodGroup: "",
                //address: {
                //    houseNumber: "",
                //    locality: "",
                //    dist: "",
                //    state: "",
                //    pin: ""
                //}
            }
        })
    }


    return (
        <div>
            <div className="justify-content-between align-items-center row m-5">
                <div className="col mx-auto ms-5">
                    <h3 className="mx-auto mx-5">{props.isNew ? 'Add New': 'Update'} Staff</h3>
                </div>
                <div className="col">
                    <button className="btn btn-outline-danger me-2" onClick={Cancel}>Cancel</button>
                    <button
                        className="btn btn-danger" onClick={Delete}
                        disabled={props.isNew || props.staffId===""}
                    >Delete</button>
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
                            value={staff.name}
                        />
                    </div>
                    <div className="row">
                    <div className="mb-4 col">
                        <label htmlFor="dateOfbirth">Date of Birth</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dateOfbirth"
                            placeholder="YYYY-MM-DD"
                            onChange={handleChange}
                            value={staff.dateOfBirth}
                            //value={student.dateOfbirth.getFullYear()+"/"+student.dateOfbirth.getMonth()+"/"+student.dateOfbirth.getDate()}
                        />
                        </div>
                        <div className="mb-4 col">
                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            className="form-control"
                            name="role"
                            onChange={handleChange}
                            value={staff.role}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-4">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={handleChange}
                                value={staff.phone}
                                />
                        </div>
                        <div className="col mb-4">
                            <label htmlFor="altPhone">Alternate Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="altPhone" 
                                onChange={handleChange}
                                value={staff.altPhone}
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
                            value={staff.email}
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
                                    value={staff.gender}
                                />
                        </div>
                        <div className="col mx-4">
                            <label htmlFor="bloodGroup">Blood Group</label>
                                <input
                                    className="form-control" type="text"
                                    name="bloodGroup"
                                    onChange={handleChange}
                                    value={staff.bloodGroup}
                                    />
                        </div>
                    </div>

                    {/*<div className="row">
                        <div className="mb-4 col-4">
                            <label htmlFor="houseNumber">House Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="houseNumber" 
                                onChange={handleChange}
                                value={staff.address.houseNumber}
                                />
                        </div>
                        <div className="mb-4 col">
                            <label htmlFor="locality">Locality</label>
                            <input
                                type="text"
                                className="form-control"
                                name="locality" 
                                onChange={handleChange}
                                value={staff.address.locality}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col">
                            <label htmlFor="dist">District</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dist" 
                                onChange={handleChange}
                                value={staff.address.dist}
                                />
                        </div>
                        <div className="mb-4 col">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="state" 
                                onChange={handleChange}
                                value={staff.address.state}
                                />
                        </div>
                        <div className="mb-4 col">
                            <label htmlFor="pin">Pin</label>
                            <input
                                type="text"
                                className="form-control"
                                name="pin" 
                                onChange={handleChange}
                                value={staff.address.pin}
                                />
                        </div>
                    </div>*/}
                    <button className="btn btn-lg btn-success" onClick={onSubmit} type="submit">{props.isNew?'Save':'Update'}</button>
                </div>
            </form>
        </div>    
    );
}

export default AddStaff;