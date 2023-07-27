const router = require("express").Router();
const axios = require('axios');

const { InfluxDB,Point} = require('@influxdata/influxdb-client');

/*
  Route:/api/getData/cummulative/fromdate/todate
  incoming data:fromdate,todate using params
  respone: 200 if success and data in json format
          500 if error
*/

router.get("/cummulative/:fromDate/:toDate", async (req, res) => {
    // fromdate and todate from params
    let fromDate=req.params.fromDate;
    let toDate=req.params.toDate;
    // console.log(new Date(fromDate),new Date(toDate));
    
    //initialising influxdb client
    const token = process.env.INFLUXDB_TOKEN;
    const url = process.env.DATABASE_URL;
    const org = process.env.INFLUXDB_ORG;
    const bucket = process.env.INFLUXDB_BUCKET;
    const client = new InfluxDB({url, token});
    //query client
    let queryClient = client.getQueryApi(org);
    //flux query
    let fluxQuery = `from(bucket: "${bucket}")
    |> range(start: ${new Date(fromDate).toISOString()}, stop: ${new Date(toDate).toISOString()})
    |> filter(fn: (r) => r._measurement == "census")
    |> filter(fn: (r) => r._field == "totalconfirmed" or r._field == "totalrecovered" or r._field == "totaldeceased")`;
    console.log(fluxQuery)
    //data object to store data
    let data={
      "totalconfirmed":[],
      "totalrecovered":[],
      "totaldeceased":[],
      "YAxis":['totalconfirmed','totalrecovered','totaldeceased'],
      "XAxis":new Set()
    };
    //querying data
    queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
        // console.log(tableObject);
        //storing data appropriately
        data[tableObject['_field']].push(tableObject['_value']);
        data['XAxis'].add(tableObject['_time']);
      },
      error: (error) => {
        console.error('\nError', error);
        //sending error
        res.status(500).send({"result": 'Internal Server Error'});
      },
      complete: () => {
        console.log('\nSuccess');
        data['XAxis']=Array.from(data['XAxis']);
        // console
        //sending data
        res.status(200).send({"result": data});
      },
    })
});
/*
  Route:/api/getData/threedayaverage/fromdate/todate
  incoming data:fromdate,todate using params
  respone: 200 if success and data in json format
            500 if error
*/
router.get("/threedayaverage/:fromDate/:toDate", async (req, res) => {
  // fromdate and todate from params
  let fromDate=req.params.fromDate;
  let toDate=req.params.toDate;
  // console.log(new Date(fromDate),new Date(toDate));

  //initialising influxdb client
  const token = process.env.INFLUXDB_TOKEN;
  const url = process.env.DATABASE_URL;
  const org = process.env.INFLUXDB_ORG;
  const bucket = process.env.INFLUXDB_BUCKET;
  const client = new InfluxDB({url, token});
  //query client
  let queryClient = client.getQueryApi(org);
  //flux query
  let fluxQuery = `from(bucket: "${bucket}")
  |> range(start: ${new Date(fromDate).toISOString()}, stop: ${new Date(toDate).toISOString()})
  |> filter(fn: (r) => r._measurement == "census")
  |> filter(fn: (r) => r._field == "dailyconfirmed" or r._field == "dailyrecovered" or r._field == "dailydeceased")
  |> aggregateWindow(every: 3d, fn: mean, createEmpty: false)`;
  console.log(fluxQuery);
  //data object to store data
  let data={
    "dailyconfirmed":[],
    "dailyrecovered":[],
    "dailydeceased":[],
    "YAxis":['totalconfirmed','totalrecovered','totaldeceased'],
    "XAxis":new Set()
  };
  //querying data
  queryClient.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
      const tableObject = tableMeta.toObject(row)
      // console.log(tableObject);
      //storing data appropriately
      data[tableObject['_field']].push(tableObject['_value']);
      data['XAxis'].add(tableObject['_time']);
    },
    error: (error) => {
      console.error('\nError', error);
      res.status(500).send({"result": 'Internal Server Error'});
    },
    complete: () => {
      console.log('\nSuccess');
      data['XAxis']=Array.from(data['XAxis']);
      // console.log(data);
      res.status(200).send({"result": data});
    },
  })
});
module.exports = router;