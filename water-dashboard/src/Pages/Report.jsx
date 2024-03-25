import { useAlert } from 'react-alert';
import 'react-responsive-modal/styles.css';
import useDebounce from '../Hooks/useDebounce';
import MiddleService from "../API/MiddleService";
import React, { useState, useEffect } from "react";
import { dateTimeFormat } from '../Service/service';


const Water = () => {

    const alert = useAlert();
    const [employee, setEmployee] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const [waterBottleList, setWaterBottleList] = useState([]);

    const debouncedValue = useDebounce(searchValue, 500);

    console.log("employee :- ", employee);

    useEffect(() => {
        getEmployeeListOptions();
    }, [])

    useEffect(() => {
        callAPI();
    }, [debouncedValue, employee])

    const callAPI = async () => {
        setLoading(true);
        try {
            const payload = {
                "search": debouncedValue || "",
                "employeeId": employee,
            };

            const response = await MiddleService.postData(`water_bottle`, payload);
            if (response.status === 'success') {
                setWaterBottleList(response?.data)
            }
        }
        catch (error) {
            alert.error('Something went wrong');
            console.error(error);
        }
        setLoading(false);
    }

    const getEmployeeListOptions = async () => {
        setLoading(true);
        try {
            const payload = {
                "search": "",
            };

            const response = await MiddleService.postData(`employee`, payload);
            if (response.status === 'success' && response?.data?.length) {
                const result = {};
                response?.data?.map((item) => {
                    const { _id, name, price } = item;
                    result[_id] = { _id, name, price }
                    return null;
                })
                setEmployeeList(result)
            }
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    return (
        <>
            <div class={"content-wrapper"}>
                <div class="row">
                    <div class="col-md-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p class="card-title mb-0">Water Bottle</p>
                                    <div className="d-flex form-group">
                                        <select name="employee" class="form-control" style={{ marginRight: 10 }} value={employee} onChange={(e) => setEmployee(e.target.value)}>
                                            <option value="">All Employee</option>
                                            {employeeList && Object.values(employeeList)?.length && Object.values(employeeList)?.map((item) => {
                                                const { _id: id, name } = item;
                                                return (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <input onChange={handleSearch} type="text" class="form-control form-control-sm" placeholder="Search" style={{ marginRight: 10 }} />
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table id="order-listing"
                                        class="table table-striped table-borderless"
                                    >
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Name</th>
                                                <th>Number of Bottle</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th>Date (DD-MM-YY)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                waterBottleList?.length ?
                                                    waterBottleList?.map((item, index) => {
                                                        const { _id: id, employeeId, name, number_of_bottle, price, order_date, total } = item;
                                                        return (
                                                            <tr key={id}>
                                                                <td>{index + 1}</td>
                                                                <td>{name || employeeList[employeeId]?.name || ''}</td>
                                                                <td>{number_of_bottle}</td>
                                                                <td>{price}</td>
                                                                <td>{total}</td>
                                                                <td>{dateTimeFormat(order_date)}</td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={10} className='text-center'>
                                                            {isLoading ? 'Loading...' : 'No Data Found!!'}
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* {!!waterBottleList?.length && (
                                    <div className='peginationDisplay'>
                                        <Pagination totalLength={50} getCurrentPage={getCurrentPage} />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Water;