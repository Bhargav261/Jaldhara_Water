import { useForm } from "react-hook-form";
import 'react-responsive-modal/styles.css';
import useDebounce from '../Hooks/useDebounce';
import { Modal } from 'react-responsive-modal';
import MiddleService from "../API/MiddleService";
import React, { useState, useEffect } from "react";
import { dateTimeFormat } from '../Service/service';


const Water = () => {

    const [type, setType] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [modalInfo, setModalInfo] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const [waterBottleList, setWaterBottleList] = useState([]);
    const [modalStatus, setModalStatus] = useState({ delete: false, addEdit: false });

    const debouncedValue = useDebounce(searchValue, 500);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        getEmployeeListOptions();
    }, [])

    useEffect(() => {
        callAPI();
    }, [debouncedValue])

    const callAPI = async () => {
        setLoading(true);
        try {
            const payload = {
                "search": debouncedValue || "",
            };

            const response = await MiddleService.postData(`water_bottle`, payload);
            if (response.status === 'success') {
                setWaterBottleList(response?.data)
            }
        }
        catch (error) {
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
            if (response.status === 'success') {
                setEmployeeList(response?.data)
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

    const toggleModal = ({ type, status, data }) => {
        const newType = type === 'delete' ? type : 'addEdit'
        setModalStatus((prev) => ({
            ...prev,
            [newType]: status
        }))
        setModalInfo(data);
        setType(type);

        if (!status) {
            reset();
        }

        if (type === 'edit') {
            const { employeeId, price, number_of_bottle } = data;
            setValue("employee", employeeId)
            setValue("number_of_bottle", number_of_bottle)
            setValue("price", price)
        } else {
            setValue("price", 5)
        }
    }

    const onDeleteBottle = async () => {
        const { _id: id } = modalInfo;
        try {
            const payload = {
                id
            }
            const response = await MiddleService.postData(`water_bottle/delete`, payload);
            if (response.status === 'success') {
                toggleModal({ type: 'delete', status: false })
                callAPI();
            }

        }
        catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (data) => {

        const { employee, number_of_bottle, price } = data;
        const { _id: id } = modalInfo || {};

        setLoading(true);
        try {
            const payload = { id, employeeId: employee, number_of_bottle, price }
            const response = await MiddleService.postData(`water_bottle/addEdit`, payload);

            if (response.status === 'success') {
                toggleModal({ type: 'addEdit', status: false })
                callAPI();
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

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
                                        <input onChange={handleSearch} type="text" class="form-control form-control-sm" placeholder="Search" style={{ marginRight: 10 }} />
                                        <button type="button" class="btn btn-primary" onClick={() => toggleModal({ type: 'add', status: true })}>Add</button>
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
                                                <th>Date Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                waterBottleList?.length ?
                                                    waterBottleList?.map((item, index) => {
                                                        const { id, name, number_of_bottle, price, createdAt } = item;
                                                        return (
                                                            <tr key={id}>
                                                                <td>{index + 1}</td>
                                                                <td>{name}</td>
                                                                <td>{number_of_bottle}</td>
                                                                <td>{price}</td>
                                                                <td>{price * number_of_bottle}</td>
                                                                <td>{dateTimeFormat(createdAt)}</td>
                                                                <td>
                                                                    <i title="Edit" style={{ marginRight: 15 }} className="color-red fa fa-edit cursor-pointer" onClick={() => toggleModal({ type: 'edit', status: true, data: item })}></i>
                                                                    <i title="Delete" className="color-red fa fa-trash cursor-pointer" onClick={() => toggleModal({ type: 'delete', status: true, data: item })}></i>
                                                                </td>
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

                {/* Edit Modal */}
                <Modal center showCloseIcon={false} open={modalStatus?.addEdit} onClose={() => toggleModal({ type: 'addEdit', status: false })} classNames={{ modal: 'modal-dialog' }}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">
                                {type === 'add' ? 'Add' : 'Edit'} Water Bottle
                            </h5>
                        </div>
                        <div class="modal-body">

                            <form class="pt-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <label>Employee</label>
                                    <select name="employee"
                                        {...register("employee", {
                                            required: 'Employee is requried',
                                        })}
                                        class="form-control form-control-lg"
                                        disabled={type === 'edit' ? true : false}
                                    >
                                        <option value="">Select Employee</option>
                                        {
                                            employeeList?.length && employeeList?.map((item) => {
                                                const { _id: id, name } = item;
                                                return (
                                                    <>
                                                        <option value={id}>{name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                    {/* <input
                                        {...register("name", {
                                            required: 'Name is requried',
                                        })}
                                        class="form-control form-control-lg" placeholder="Enter First Name" /> */}
                                    {errors?.employee && <p className="errorMessage">{errors?.employee?.message}</p>}
                                </div>
                                <div class="form-group">
                                    <label>Number of Bottle</label>
                                    <input name="number_of_bottle" type="number"
                                        {...register("number_of_bottle", {
                                            required: 'Number of Bottle is requried',
                                        })}
                                        class="form-control form-control-lg" placeholder="Enter Number of Bottle" />
                                    {errors?.number_of_bottle && <p className="errorMessage">{errors?.number_of_bottle?.message}</p>}
                                </div>
                                <div class="form-group">
                                    <label>Price</label>
                                    <input name="price" type="number"
                                        {...register("price", {
                                            required: 'Price is requried',
                                        })}
                                        class="form-control form-control-lg" placeholder="Enter Price" />
                                    {errors?.price && <p className="errorMessage">{errors?.price?.message}</p>}
                                </div>
                                <div class="mt-3 d-flex justify-content-right">
                                    <button class="btn btn-primary btn-rounded br-8 btn-fw" disabled={isLoading} style={{ marginRight: 5 }}>
                                        {
                                            isLoading ?
                                                <>
                                                    <span class="spinner-border spinner-border-sm"></span> Loading...
                                                </>
                                                : type === 'edit' ? 'Update' : 'Save'
                                        }
                                    </button>
                                    <button type="button" class="ml-2 btn btn-light" onClick={() => toggleModal({ type: 'addEdit', status: false })}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>

                {/* Delete Modal */}
                <Modal center showCloseIcon={false} open={modalStatus.delete} onClose={() => toggleModal({ type: 'delete', status: false })} classNames={{ modal: 'modal-dialog' }}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">Delete Water Bottle</h5>
                        </div>
                        <div class="modal-body">
                            <div>
                                Are you sure want to delete the <b>{modalInfo?.name}</b> water bottle ?
                            </div>
                            <div class="mt-5 d-flex justify-content-right">
                                <button class="btn btn-primary btn-rounded br-8 btn-fw" disabled={isLoading} style={{ marginRight: 5 }} onClick={onDeleteBottle}>
                                    {
                                        isLoading ?
                                            <>
                                                <span class="spinner-border spinner-border-sm"></span> Loading...
                                            </>
                                            : 'Delete'
                                    }
                                </button>
                                <button type="button" class="ml-2 btn btn-light" onClick={() => toggleModal({ type: 'delete', status: false })}>Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        </>
    )
}

export default Water;