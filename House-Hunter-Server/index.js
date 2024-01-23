const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gx7mkcg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('Database connected');

    const houseCollection = client.db('HouseHunter').collection('houses');
    const userCollection = client.db('HouseHunter').collection('users');

    // Users collections 

    app.get('/user', async(req, res)=>{
      const result = await userCollection.find().toArray()
      res.send(result)
    })
  
    app.get('/user/:email', async(req, res)=>{
      const userEmail = req.params?.email
      const query = {email: userEmail}
      const result = await userCollection.findOne(query)
      res.send(result)
    })

    app.post('/user', async (req, res) => {
      const userData = req.body;
      const query = {email : req.body.email} 
      const find = await userCollection.findOne(query)
      if(find){
        return res.send  ({message: 'user already exists', insertedId : null})
      }
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    app.post('/house', async (req, res) => {
      const userData = req.body;
      const result = await houseCollection.insertOne(userData);
      res.send(result);
    });


    // extra stuff

    app.get('/', (req, res) => {
      res.send('Server is running');
    });

    app.listen(port, () => {
      console.log(`Your port is ${port}`);
    });
  } finally {
    // Close the MongoDB connection if needed
    // await client.close();
  }
}

run().catch(console.dir);
