import axios from 'axios';
import { useAlert } from 'react-alert';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MiddleService from '../API/MiddleService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const alert = useAlert();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await MiddleService.postData('login', data);

            const { message } = response || {};

            if (response.status === 'success') {
                const { token } = response?.data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('jaldhara_water', `Bearer ${token}`);
                alert.success(message);
                navigate('/app/dashboard');
            }else{
                alert.success(message);
            }
        } catch (error) {
            console.error(error);
            alert.error('Something Went Wrong !!');
        }
        setLoading(false);
    };

    return (
        <>
            <div class="container-scroller">
                <div class="container-fluid page-body-wrapper full-page-wrapper">
                    <div class="content-wrapper d-flex align-items-center auth px-0">
                        <div class="row w-100 mx-0">
                            <div class="col-lg-4 mx-auto">
                                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div class="brand-logo text-center">
                                        <img src="/images/Fruxinfo_Logo.png" alt="logo" />
                                    </div>
                                    <h6 class="font-weight-light">Sign in to continue.</h6>
                                    <form class="pt-3" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="form-group">
                                            <input
                                                {...register("username", {
                                                    required: 'Username is requried',
                                                })}
                                                class="form-control form-control-lg" placeholder="Username" />
                                            {errors?.username && <p className="errorMessage">{errors?.username?.message}</p>}
                                        </div>
                                        <div class="form-group">
                                            <input
                                                {...register("password", {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters long',
                                                    },
                                                })}
                                                type="password"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                            />
                                            {errors?.password && <p className="errorMessage">{errors?.password?.message}</p>}
                                        </div>
                                        <div class="mt-3 section-login">
                                            <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={isLoading}>
                                                {
                                                    isLoading ?
                                                        <>
                                                            <span class="spinner-border spinner-border-sm"></span> Loading...
                                                        </>
                                                        : 'SIGN IN'
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;