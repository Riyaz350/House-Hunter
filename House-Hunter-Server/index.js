const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const agreementsCollection = client.db('HouseHunter').collection('agreements');

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
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    app.put('/user/:email', async(req, res)=>{
      const userEmail = req.params?.email
      const query = {email: userEmail}
      options={upsert:true}
      const result = await userCollection.findOne(query)
      res.send(result)
    })

    app.put('/users/:email',  async (req, res) => {
      const houseId = req.body;
      const mail = req.params.email;
      const filter = { email: mail };
      const updateDoc = {
        $push: {
          owned: houseId.id,
        },
      };
      const options = {upsert: true}
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    // Houses collection

    app.get('/house', async(req, res)=>{
      const result = await houseCollection.find().toArray()
      res.send(result)
    })
    app.get('/house/:email', async(req, res)=>{
      const userEmail = req.params?.email
      const query = {email: userEmail}
      const result = await houseCollection.find(query).toArray()
      res.send(result)
    })

    app.post('/house', async (req, res) => {
      const userData = req.body;
      const result = await houseCollection.insertOne(userData);
      res.send(result);
    });

    app.put('/house/:_id',  async (req, res) => {
      const updatedApartment = req.body;
      const id = req.params._id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
          $set: {
            title: updatedApartment.title,  
            name:updatedApartment.name,
            date:updatedApartment.date,
            address:updatedApartment.address,
            city:updatedApartment.city,
            phone:updatedApartment.phone,
            bed:updatedApartment.bed,
            bath:updatedApartment.bath,
            size:updatedApartment.size,
            rent:updatedApartment.rent,
            photo:updatedApartment.photo,
            description:updatedApartment.description
          },
      };
      const options = {upsert: true}
      const result = await houseCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    app.patch('/house/:_id',  async (req, res) => {
      const updatedApartment = req.body;
      const id = req.params._id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
          $set: {
              status: updatedApartment.status,
          },
      };
      const result = await houseCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

    app.delete('/house/:e', async(req, res)=>{
      const id = req.params.e
      const query = {_id: new ObjectId(id)}
      const result = await houseCollection.deleteOne(query);
      res.send(result)
    })

    // agreements

    app.get('/book/:email', async(req, res)=>{
      const userEmail = req.params?.email
      const query = {owner: userEmail}
      const result = await agreementsCollection.find(query).toArray()
      res.send(result)
    })

    app.post('/book', async (req, res) => {
      const userData = req.body;
      const result = await agreementsCollection.insertOne(userData);
      res.send(result);
    });

    app.delete('/book/:e', async(req, res)=>{
      const id = req.params.e
      const query = {_id: new ObjectId(id)}
      const result = await agreementsCollection.deleteOne(query);
      res.send(result)
    })


    
  } finally {
    // Close the MongoDB connection if needed
    // await client.close();
  }
}

run().catch(console.dir);
// extra stuff

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Your port is ${port}`);
});