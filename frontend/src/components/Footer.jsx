import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { serverLink } from '../serverLink';
//footer component
function Footer(props) {
    const [text, setText] = React.useState("Initialise Database");
    async function saveData() {
        setText("Initialising Database...");
        try {

            const res = await axios.get(`${serverLink}/api/initialise`);
            setText("Database Initialised");
        } catch (error) {
            alert(error);
            setText("Initialise Database");
        }
    }
    return (
        <div className='w-full flex justify-center items-center h-[70px]  mt-auto gap-10'>
            <p className='text-md text-blue-400 font-semibold'>Built by 
            <b className='text-slate-400'> Noel Vincent P</b>
            </p>
            <Button variant="outlined" color="primary" onClick={()=>{saveData()}} className='ml-5'>{text}</Button>
        </div>

    );
}

export default Footer;