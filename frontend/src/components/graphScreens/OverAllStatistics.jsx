import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { serverLink } from '../../serverLink';
import StackedLineChart from '../charts/StackedLineChart';
import Loader from '../Loader';
import axios from 'axios';
/*
    This component is to display the overall statistics.
*/
function OverAllStatistics(props) {
    //states to store from,to dates and data
    const [fromDate, setFromDate] = React.useState(dayjs('2020-04-17'));
    const [toDate, setToDate] = React.useState(dayjs('2020-06-17'));
    const [data, setData] = React.useState({
        "totalconfirmed":[],
        "totalrecovered":[],
        "totaldeceased":[],
        "YAxis":['totalconfirmed','totalrecovered','totaldeceased'],
        "XAxis":[]
      });
    //state to store loading status
    const [isLoading, setIsLoading] = React.useState(false);
    //function to fetch data from server data format is defined in use state of data
    async function getData() {
        try {
            setIsLoading(true);
            let res=await axios.get(`${serverLink}/api/getData/cummulative/${fromDate.toISOString()}/${toDate.toISOString()}`,{
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
    //fetch data on component mount
    React.useEffect(() => {getData()}, []);
    return (
        //main div
        <div className='w-[80%] flex flex-col justify-center items-center shadow-lg p-6 gap-5'>
            <h2 className=' font-bold text-xl'> Over All India Statistics</h2>
            {/*div to display date picker and fetch data button*/}
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
            {/*Graph Component*/}
            {!isLoading && data!=null && <StackedLineChart data={data}/>}
            {isLoading && <Loader />}
        </div>
    );
}

export default OverAllStatistics;