import React from "react";
import MiddleService from "../API/MiddleService";

const Home = () => {

    return (
        <>
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Welcome Admin!</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-4 stretch-card transparent">
                        <div class="card card-dark-blue">
                            <div class="card-body">
                                <p class="mb-4">Total Employee</p>
                                <p class="fs-30 mb-2">{10}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;