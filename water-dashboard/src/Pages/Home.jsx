import React, { useEffect, useState } from "react";
import MiddleService from "../API/MiddleService";

const Home = () => {

    const [employeeList, setEmployeeList] = useState();

    useEffect(() => {
        callAPI();
    }, [])

    const callAPI = async () => {
        try {
            const response = await MiddleService.getData(`employee`);
            if (response) {
                setEmployeeList(response?.data)
            }
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
            callAPI();
        }
        catch (error) {
            console.error(error);
        }
    }

    const getRandomInt = (min, max) => {
        // Use Math.floor to ensure the result is an integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const onEditEmployee = async (id) => {
        try {
            const payload = {
                id,
                name: `ABCd ${getRandomInt(1, 10)}`
            }
            const response = await MiddleService.postData(`employee/edit`, payload);
            console.log("response : -", response)
            callAPI();
        }
        catch (error) {
            console.error(error);
        }
    }

    const onDeleteEmployee = async (id) => {
        try {
            const payload = {
                id,
            }
            const response = await MiddleService.postData(`employee/delete`, payload);
            console.log("response : -", response)
            callAPI();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            Home
            <button onClick={addEmployee}>Add Employee</button>

            {
                employeeList?.map((item) => {
                    const { _id: id, name } = item;
                    return (
                        <div key={id}>
                            <div style={{ display: "flex" }}>
                                {name}
                                <div style={{ marginLeft: 15 }} onClick={() => onEditEmployee(id)} >Edit</div>
                                <div style={{ marginLeft: 15 }} onClick={() => onDeleteEmployee(id)} >Delete</div>

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Home;