import axios from 'axios';
import React, { useEffect } from "react";
import MiddleService from "../API/MiddleService";

const Home = () => {

    useEffect(() => {
        callAPI();
    }, [])

    const callAPI = async () => {
        try {
            const response = await MiddleService.getData(`employee`);
            console.log("response : -", response)
        }
        catch (error) {
            console.error(error);
        }
    }

    const addEmployee = async () => {
        try {
            const payload = {
                name: 'ABCd'
            }
            const response = await MiddleService.postData(`employee/add`, payload);
            console.log("response : -", response)
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            Home
            <button onClick={addEmployee}>Add Employee</button>
        </>
    )
}

export default Home;