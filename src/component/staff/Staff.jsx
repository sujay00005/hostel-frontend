import axios from "axios";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../../constant/constants";
import {useNavigate} from "react-router-dom";

function Staff() {
    
    let [staffs, setStaffs]=useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(baseUrl+"get-staffs")
            .then((res) => {
                console.log("###############");
                console.log(res);
                setStaffs((prevStaffs) => {
                    return res.data.data;
                    
                });

                console.log(staffs);
            })
            .catch(err => console.log(err));
    }, []);

    function Search(event) {
        const searchKeyword=event.target.value;
    }


    return (
        <div className="m-3">
            <div className="data-container students-list row m-5">
                <div className="display-6 col">All Staffs</div>
                <button
                    className="btn btn-outline-success col-2 ms-5"
                    onClick={()=>navigate('/add-staff')}
                >Add New Staff</button>
            </div>
            
            <div className="row ms-2 me-5">
                <input
                    className="form-control col mx-5"
                    type="search"
                    placeholder="Search Staff"
                    name="search-student"
                    onClick={Search}
                ></input>
                    <button className="btn btn-dark btn-sm col-2">Search</button>
            </div>
            <div className="m-3">
                <table className=" m-4 table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { (staffs !=={} || staffs!== "") && staffs.map((staff) => {
                            return (
                                <tr>
                                    <td>{staff.name}</td>
                                    <td>{staff.role}</td>
                                    <td>{staff.gender}</td>
                                    <td>{staff.phone}</td>
                                    <td>{staff.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Staff;