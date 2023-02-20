import React from 'react';
import Lottie from "react-lottie";
import animationData from "./loaderAnim.json";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
function Loader(props) {
    return (
        <div className={'container position-absolute loader-bg'}>
            <Lottie options={defaultOptions} height={310} width={310} />
        </div>
    );
}

export default Loader;