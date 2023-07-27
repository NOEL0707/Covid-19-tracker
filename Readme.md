# COVID-19 Tracker
## The Website
This is a simple one page website which displays two graph.
- Number of confirmed,deceased,recovered patients between a time range 
- Average of confirmed,deceased,recovered patients between a time range in interval of three days 

# Installation Steps

## How to run using Docker?

### `Install Docker`
Follow the steps in the below website to install docker engine or any youtube video to install docker.
`https://docs.docker.com/engine/install/`

### `Git Clone`
Make sure You have Git installed on your system.If you don't have git you can download the zip folder from the code button.

### `docker compose up --build`
Use this command if you want to recompile/rebuild the image.
To run this command Make sure you are in the same directory in which `docker-compose.yaml` is present.
This command will spawn the frontend container at localhost:3000,Backend container at localhost:4444 and a InfluxDB database.
Open [http://localhost:3000](http://localhost:3000) to view the site.

### `docker compose up`
To run this command Make sure you are in the same directory in which `docker-compose.yaml` is present.
This command will spawn the frontend container at localhost:3000,Backend container at localhost:4444 and a InfluxDB database.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `docker compose down`
This command will remove the spawned containers.

### `docker compose down -v`
This command will remove the spawned containers as well as the data/volumes associated with it.
