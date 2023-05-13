import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Container, Stack} from "@mui/material";

function Student() {

    let [data, setData]=useState([]);
    let [prev, setPrev]=useState();
    let [next, setNext]=useState();
    let [filter, setFilter]=useState({
        page:1,
    });
    const navigate=useNavigate();

    function getStudents() {
        axios.get("http://localhost:5000/get-students", {params: filter})
            .then((res) => {
                console.log("🤗🙂☺☺🙂☺☺");
                console.log(res);
                setData((prevData) => {
                    console.log("Came here too");
                    return res.data.data.results;
                });
                if(res.data.data.next) {
                    setNext((prevNext) => {
                        return res.data.data.next.page;
                    })
                } else {
                    setNext((prevNext) => {
                        return null;
                    })
                }

                if(res.data.data.prev) {
                    setPrev((prevPrev) => {
                        return res.data.data.prev.page;
                    })
                } else {
                    setPrev((prevPrev) => {
                        return null;
                    })
                }
                console.log("😀😀😂🤣");
                console.log(data);

                //data.map((stu) => {
                //    console.log(stu);
                //})
            }).catch(
                (err) => {
                    console.log("ERROR HAPPANED HERE");
                    console.log(err);
                });
    }

    console.log(prev+"----------------"+next);

    useEffect(() => {
        getStudents();
    }, []);
    
    function Search(event) {
        const searchKeyword = event.target.value;
        setFilter((prevFilter) => {
            return {
                name: searchKeyword,
                phone: searchKeyword,
                email: searchKeyword,
                page: prevFilter.page,
            }
        });
        
        //getStudents();
    }

    function Reset(event) {
        setFilter((prevFilter) => {
            return {
                page: prevFilter.page,
            }
        });
        getStudents();
    }

    function Prev(event) {
        setFilter((prevFilter) => {
            return {
                page: prevFilter.page -1,
            }
        });
        getStudents();
    }

    function Next(event) {
        setFilter((prevFilter) => {
            console.log("SETTING FILTER"+prevFilter.page)
            return {
                page: prevFilter.page+1,
            }
        });
        getStudents();
    }

    return (
        <div className="">
            <Container>
            <div className="data-container students-list row m-5">
                <div className="display-6 col">All Students</div>
                <button
                    className="btn btn-outline-success col-2 ms-5"
                    onClick={()=> navigate('/add-student')}
                >Add New Student</button>
            </div>
            
            <div className="row ms-2 me-5">
                <input
                    className="form-control col mx-5"
                    type="search"
                    placeholder="Search Student"
                    name="search-student"
                    onChange={Search}
                />

                {/*<div className="col-4">
                <div className="form-select">
                    <select name="cars" id="cars">
                        <option value="name">Name</option>
                        <option value="phone">Phone</option>
                        <option value="id">Id</option>
                    </select>
                    </div>
                </div>*/}
                {/*<div className="col-2">
                    <Button variant="contained" onClick={()=>{getStudents()}}>Search</Button>
                    
                </div>*/}

                <Stack spacing={1} direction='row' className="col-2">
                    <button className="btn btn-dark" onClick={()=>{getStudents()}}>Search</button>
                    <button className="btn btn-outline-danger" onClick={()=>Reset()}>Reset</button>
                </Stack>
                  
                </div>
            </Container>  
            <div className="m-3">
                <Container>
                <table className=" m-4 table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    
                    {data.map((stu) => {
                        return (
                            <tbody onClick={() => {
                                navigate(
                                    '/add-student',
                                    {
                                        state: {isNew: false, studentId: "6459fc08f0b8a794f2ffae8a"}
                                    });
                                //this.context.router.push({
                                //    pathname: '/add-student',
                                //    state: {isNew: false, studentId: stu._id}
                                //})
                            }}>
                                    <tr key={stu._id}>
                                        <td>{stu.name}</td>
                                        <td>{stu.gender}</td>
                                        <td>{stu.phone}</td>
                                        <td>{stu.email}</td>
                                    </tr>
                                </tbody>
                        );
                    })}
                    </table>
                    <center>
                    <Stack spacing={1} direction='row' className="col-2">
                        <button className="btn btn-dark" disabled={!prev} onClick={()=>{Prev()}}>Prev</button>
                        <button className="btn btn-dark" disabled={!next} onClick={() => {Next()}}>Next</button>
                        </Stack>
                    </center>
                </Container>
            </div>
        </div>
    )
}

export default Student;