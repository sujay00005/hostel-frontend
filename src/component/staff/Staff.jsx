//import axios from "axios";
import React, {useState} from "react";
//import {baseUrl} from "../../constant/constants";
import {useNavigate} from "react-router-dom";
import { Container, Stack } from "@mui/material";
import {useRef} from "react";
import GetStaffs from "./GetStaffs";
import {useCallback} from "react";

function Staff() {
    
    //let [staffs, setStaffs]=useState([]);
    //let [prev, setPrev]=useState();
    //let [next, setNext]=useState();
    const navigate=useNavigate();
    let [filter, setFilter]=useState({
        page:1
    });

    //const [pageNumber, setPageNumber]=useState(1);
    const {
        staffs,
        hasMore,
        loading,
        error
    }=GetStaffs(filter);
    
    //The useRef Hook allows us to persist values between renders.
    //(not part of our state so does not update on every time things changes)
    const observer=useRef();

    //This allows us to isolate resource intensive functions so that they will not automatically run on every render.
    //The useCallback Hook only runs when one of its dependencies update.
    const lastStaffElementRef=useCallback(node => {
        if(loading) return;
        //The IntersectionObserver method "disconnect()" stops watching all of its target elements for visibility changes.
        if(observer.current) observer.current.disconnect();

        //The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

        observer.current=new IntersectionObserver(enteries => {
            //Everything the observer is watching is enteries
            if(enteries[0].isIntersecting && hasMore) {
                //Check the value of the isIntersecting property to see if the entry represents an element that currently intersects with the root.
                //setPageNumber(prevPageNumber => prevPageNumber+1);
                setFilter(prevFilter => {
                    return {page: prevFilter.page+1};
                })
            }
        })
        if(node) observer.current.observe(node)
    },[loading,hasMore])

    //function getStaffs() {
    //    axios.get(baseUrl+"get-staffs", {params: filter})
    //        .then((res) => {
                
    //            setStaffs((prevData) => {
    //                return res.data.data.results;
    //            });

    //            //console.log("###############");
    //            //console.log(staffs);

    //            if(res.data.data.next) {
    //                setNext((prevNext) => {
    //                    return res.data.data.next.page;
    //                })
    //            } else {
    //                setNext((prevNext) => {
    //                    return null;
    //                })
    //            }

    //            if(res.data.data.prev) {
    //                setPrev((prevPrev) => {
    //                    return res.data.data.prev.page;
    //                })
    //            } else {
    //                setPrev((prevPrev) => {
    //                    return null;
    //                })
    //            }
    //        })
    //        .catch((err) => {
    //            console.log("ERROR WHILE RETRIVING STAFF DATA");
    //            console.log(err);
    //        });
    //}

    //useEffect(() => {
    //    getStaffs();
    //    //axios.get(baseUrl+"get-staffs")
    //    //    .then((res) => {
    //    //        console.log("###############");
    //    //        console.log(res);
    //    //        setStaffs((prevStaffs) => {
    //    //            return res.data.data.results;
                    
    //    //        });

    //    //        console.log(staffs);
    //    //    })
    //    //    .catch(err => console.log(err));
    //}, []);

    function Search(event) {
        const searchKeyword=event.target.value;
        setFilter((prevFilter) => {
            return {
                name: searchKeyword,
                phone: searchKeyword,
                email: searchKeyword,
                page: 1
            }
        });
        //setPageNumber(1);
    }

    function Reset(event) {
        setFilter((prevFilter) => {
            return {
                page: 1
            }
        });
        //setPageNumber(1);
        //getStaffs();
    }

    //function Prev(event) {
    //    setFilter(prevFilter => {
    //        return {
    //            page: prevFilter.page-1,
    //        }
    //    });
    //    getStaffs();
    //}

    //function Next(event) {
    //    setFilter((prevFilter) => {
    //        return {
    //            page: prevFilter.page+1
    //        }
    //    });

    //    getStaffs();
    //}


    return (
        <div className="m-3">
            <Container>
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
                    onChange={Search}
                    value={filter.name}
                />
                    <Stack spacing={1} direction='row' className="col-2">
                        <button className="btn btn-dark" onClick={Search}>Search</button>
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
                            <th scope="col">Role</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    
                    {staffs.map((staff, index) => {
                        if(staffs.length===index+1){
                            return (
                                <tbody ref={lastStaffElementRef}  key={staff._id}>
                                    <tr>
                                        <td>{staff.name}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.gender}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.email}</td>
                                    </tr>
                            </tbody>
                            )
                        } else{
                            return(
                                        <tbody key={staff._id}>
                                            <tr>
                                                <td>{staff.name}</td>
                                                <td>{staff.role}</td>
                                                <td>{staff.gender}</td>
                                                <td>{staff.phone}</td>
                                                <td>{staff.email}</td>
                                            </tr>
                                        </tbody>
                            )
                        }
                    })
                    }
                    
                    </table>
                    <div>{loading&&'LOADING...'}</div>
                    <div>{error&&'Error'}</div>
                </Container>
            </div>
        </div>
    )
}

export default Staff;