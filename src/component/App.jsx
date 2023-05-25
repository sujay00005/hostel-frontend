import React from "react";
import Student from "./student/Student"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./student/AddStudent";
import Staff from "./staff/Staff"; 
import AddStaff from "./staff/AddStaff";
import Signup from "./login/Signup";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route exact path='/auth' element={<Signup />} />
            <Route exact path='/' element={<Student />}></Route>
            <Route exact path='/add-student' element={<AddStudent isNew={false} studentId= "6459fc08f0b8a794f2ffae8a" />}></Route>
            <Route exact path='/staffs' element={<Staff />}></Route>
            <Route exact path='/add-staff' element={<AddStaff isNew={true} staffId="" />}></Route>
        </Routes>
        {/*<Student/>*/}
        {/*<AddStudent isNew={true} studentId="" />*/}
        {/*<AddStudent isNew={false} studentId="644f6d4dd2b54c9d56298701" />*/}
        {/*studentId="642488f5c8c8cef2bf862fcd"*/}

        {/*<Staff/>*/}
        {/*<AddStaff isNew={true} staffId="" />*/}
        {/*<AddStaff isNew={false} staffId="6450f52285d877d4cc82042d" />*/}
    </BrowserRouter>
}

export default App;