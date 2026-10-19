import React from "react";
import { TailSpin } from 'react-loader-spinner';

export default function Spinner({isLoading = false}) {
    return (
        <div>
            <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                visible={isLoading}
            />
        </div>
    );
}