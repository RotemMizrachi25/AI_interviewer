import React from "react";
import { ClipLoader } from 'react-spinners';
const Loader = ({isLoading}) => {

    return(
        <div>
            {isLoading && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column'
                }}>
                    <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                    <p>Loading... Please wait</p>
                </div>)}
        </div>
    )
}

export default Loader;