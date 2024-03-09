import axios from 'axios';
import React, { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        callAPI();
    },[])

    const callAPI = async() => {
        const response = await axios.get(`employee`);
        console.log("response : -", response)
    }

    return (
        <>
            Home
        </>
    )
}

export default Home;