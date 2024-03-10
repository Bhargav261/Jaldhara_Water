import React from "react";

const FallbackLoader = ({ message = 'Component is Loading...' }) => {
    return (
        <div className="loader-manage">
            <div className="text-center">
                {/* <div class="lds-dual-ring ml-5"></div> */}
                <div className="loaderMessage">{message}</div>
            </div>
        </div>
    )
}
export default FallbackLoader;