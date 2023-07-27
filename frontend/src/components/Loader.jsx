import React from 'react';
import { ColorRing } from 'react-loader-spinner';

/*
    This component is to display the Loader.
*/

function Loader(props) {
    return (
        <div className='flex justify-center items-center h-full'>
            {/*Loader component from library*/}
            <ColorRing
            visible={true}
            height="100%"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#93C5FD','#93C5FD','#93C5FD','#93C5FD','#93C5FD']}
          />
        </div>

    );
}

export default Loader;