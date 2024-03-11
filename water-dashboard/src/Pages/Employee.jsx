import { useForm } from "react-hook-form";
import 'react-responsive-modal/styles.css';
import useDebounce from '../Hooks/useDebounce';
import { Modal } from 'react-responsive-modal';
import MiddleService from "../API/MiddleService";
import React, { useState, useEffect } from "react";

const Employee = () => {

    const [type, setType] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [modalInfo, setModalInfo] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [employeeList, setEmployeeList] = useState('');
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
        callAPI();
    }, [debouncedValue])

    const callAPI = async () => {
        setLoading(true);
        try {
            const payload = {
                "search": debouncedValue || "",
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
            const { name } = data;
            setValue("name", name)
        }
    }

    const onDeleteEmployee = async () => {
        const { _id: id } = modalInfo;
        try {
            const payload = {
                id
            }
            const response = await MiddleService.postData(`employee/delete`, payload);
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

        const { name } = data;
        const { _id: id } = modalInfo || {};

        setLoading(true);
        try {
            const payload = { id, name }
            const response = await MiddleService.postData(`employee/addEdit`, payload);

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
                                    <p class="card-title mb-0">Employee</p>
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
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                employeeList?.length ?
                                                    employeeList?.map((item, index) => {
                                                        const { id, name } = item;
                                                        return (
                                                            <tr key={id}>
                                                                <td>{index + 1}</td>
                                                                <td>{name}</td>
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
                                {/* {!!employeeList?.length && (
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
                                {type === 'add' ? 'Add' : 'Edit'} Employee
                            </h5>
                        </div>
                        <div class="modal-body">

                            <form class="pt-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input
                                        {...register("name", {
                                            required: 'Name is requried',
                                        })}
                                        class="form-control form-control-lg" placeholder="Enter First Name" />
                                    {errors?.name && <p className="errorMessage">{errors?.name?.message}</p>}
                                </div>
                                <div class="mt-3 d-flex justify-content-right">
                                    <button class="btn btn-primary btn-rounded br-8 btn-fw" disabled={isLoading} style={{ marginRight: 5 }}>
                                        {
                                            isLoading ?
                                                <>
                                                    <span class="spinner-border spinner-border-sm"></span> Loading...
                                                </>
                                                : type === 'edit' ? 'Update' : 'Register'
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
                            <h5 class="modal-title" id="ModalLabel">Delete Employee</h5>
                        </div>
                        <div class="modal-body">
                            <div>
                                Are you sure want to delete the <b>{modalInfo?.name}</b> employee ?
                            </div>
                            <div class="mt-5 d-flex justify-content-right">
                                <button class="btn btn-primary btn-rounded br-8 btn-fw" disabled={isLoading} style={{ marginRight: 5 }} onClick={onDeleteEmployee}>
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

export default Employee;