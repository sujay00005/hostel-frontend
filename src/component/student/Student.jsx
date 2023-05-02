import React, {useEffect, useState} from "react";
import axios from "axios";

function Student() {

    let [data, setData]=useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/get-students")
            .then((res) => {
                //console.log("🤗🙂☺☺🙂☺☺");
                //console.log(res);
                setData((prevData) => {
                    console.log("Came here too");
                    return res.data.data;
                });
                //console.log("😀😀😂🤣");
                //console.log(data);

                //data.map((stu) => {
                //    console.log(stu);
                //})
            }).catch((err)=>console.log(err));
    });

    return (
        <div className="m-3">
            <div className="data-container students-list row m-5">
                <div className="display-6 col">All Students</div>
                <button className="btn btn-outline-success col-2 ms-5">Add New Student</button>
            </div>
            
            <div className="row ms-2 me-5">
                    <input className="form-control col mx-5" type="search" placeholder="Search Student" name="search-student"></input>
                    <button className="btn btn-dark btn-sm col-2">Search</button>
            </div>
            <div className="m-3">
                <table className=" m-4 table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((stu) => {
                            return (
                                <tr>
                                <td>{stu.name}</td>
                                <td>{stu.gender}</td>
                                <td>{stu.phone}</td>
                                <td>{stu.email}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Student;