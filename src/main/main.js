import express from 'express'
import bodyParser from 'body-parser'

const port = process.env.SERVER_PORT || 3000;

const app = express();

// SETUP
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
const router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'Hello World!'})
});

// REGISTER ROUTES
app.use('/api', router);

// START SERVER ON PORT
app.listen(port);
