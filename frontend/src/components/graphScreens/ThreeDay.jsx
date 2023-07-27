import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { serverLink } from '../../serverLink';
import Loader from '../Loader';
import axios from 'axios';
import Histogram from '../charts/Histogram';

/*
    This component is used to display the three day average of the data
*/
function ThreeDay(props) {
    // state variables for the date pickers
    const [fromDate, setFromDate] = React.useState(dayjs('2020-04-17'));
    const [toDate, setToDate] = React.useState(dayjs('2020-06-17'));
    // state variable for the data
    const [data, setData] = React.useState({
        "totalconfirmed":[],
        "totalrecovered":[],
        "totaldeceased":[],
        "YAxis":['totalconfirmed','totalrecovered','totaldeceased'],
        "XAxis":[]
      });
      // state variable for loading
    const [isLoading, setIsLoading] = React.useState(false);
    // function to get data from the server
    async function getData() {
        try {
            setIsLoading(true);
            let res=await axios.get(`${serverLink}/api/getData/threedayaverage/${fromDate.toISOString()}/${toDate.toISOString()}`,{
                withCredentials: false,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                },
              })
              setData(res.data.result);
              setIsLoading(false);
              console.log(res.data.result);
        } catch (error) {
            console.log(error);
            alert(error.response.data.result);
            setIsLoading(false);
        }
    }
    // call the getData function on first render
    React.useEffect(() => {getData()}, []);
    return (
        <div className='w-[80%] h-fit flex flex-col justify-center items-center shadow-lg p-6 gap-5'>
            <h2 className=' font-bold text-xl'> Three Day Averages</h2>
            <div className="w-[100%] flex justify-center items-center gap-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='flex justify-center items-center gap-5'>
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                        />
                    </div>
   
                </LocalizationProvider>
                <Button variant="contained" onClick={getData}>Fetch Data</Button>
            </div>
            {!isLoading && data!=null && <Histogram data={data}/>}
            {isLoading && <Loader />}
        </div>
    );
}

export default ThreeDay;