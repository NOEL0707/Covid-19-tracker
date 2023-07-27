const router = require("express").Router();
const axios = require('axios');

const { InfluxDB,Point} = require('@influxdata/influxdb-client');


function parseData(data) {
    let newData=data.map(({dailyconfirmed,dailydeceased,dailyrecovered,totalconfirmed,totaldeceased,totalrecovered,date,dateymd})=>{
        return(
            {
                "mesurment":"Census",
                "fields":{
                    "dailyconfirmed":dailyconfirmed,
                    "dailydeceased": dailydeceased,
                    "dailyrecovered": dailyrecovered,
                    "totalconfirmed": totalconfirmed,
                    "totaldeceased": totaldeceased,
                    "totalrecovered":totalrecovered
                },
                "timestamp":new Date(dateymd)
            }
        )
    })
    return newData;
}

/*
    Route:/api/initialise/
    incoming data:None
    respone: 200 if the data is saved
            500 if error
*/
router.get("/", async (req, res) => {
    // initialising influxdb client
    const token = process.env.INFLUXDB_TOKEN;
    const url = process.env.DATABASE_URL;
    const org = process.env.INFLUXDB_ORG;
    const bucket = process.env.INFLUXDB_BUCKET;
    const client = new InfluxDB({url, token})
    // write client   
    let writeClient = client.getWriteApi(org, bucket, 'ns');
    // api URL
    const apiUrl = 'https://data.covid19india.org/data.json';
    try{
        // getting data from api
        const response = await axios.get(apiUrl);
        // inserting data into influxdb
        for (let i = 0; i < response.data['cases_time_series'].length; i++) {
            const data = response.data['cases_time_series'][i]
            // console.log(data);
            // creating point
            const point = new Point("census")
            .intField("dailyconfirmed",data.dailyconfirmed)
            .intField("dailydeceased",data.dailydeceased)
            .intField("dailyrecovered",data.dailyrecovered)
            .intField("totalconfirmed",data.totalconfirmed)
            .intField("totaldeceased",data.totaldeceased)
            .intField("totalrecovered",data.totalrecovered)
            .timestamp(new Date(data.dateymd))
            // writing point
            writeClient.writePoint(point)
        }
        // flushing data
        await writeClient.flush();     
    }
    catch (error) {
      console.error('saving to database', error);
      res.status(500).send({"result": 'Saving Data Failed'});
      return;
    }
    res.status(200).send({"result": 'Data Saved'});
});
module.exports = router;