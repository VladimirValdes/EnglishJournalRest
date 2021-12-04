
const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        // Paths

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse JSON
        this.app.use( express.json());

    }

    routes() {

    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server runs on port ${ this.port }`);
        })
    }
}

module.exports = Server;