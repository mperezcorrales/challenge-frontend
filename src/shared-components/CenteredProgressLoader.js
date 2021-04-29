import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const CenteredProgressLoader = () => {
    return (
        <div className={'progress-loader-container'}>
            <CircularProgress style={{alignSelf: 'center', color: '#59B825'}}/>
        </div>
    );
};

export default CenteredProgressLoader;
