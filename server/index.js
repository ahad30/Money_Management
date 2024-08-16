const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://task-management-ahad.netlify.app"
  ],
  credentials: true,
  optionSuccessStatus: 200,
}


// middleware
app.use(cors(corsOptions));
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxclpw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const productCollection = client.db('ProductDB').collection('allProduct');


    app.get('/products', async (req , res) => {
      try {
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      }
      catch (error) {
        res.status(500).send({ message: "some thing went wrong" })
      }
    })

                                             
    app.get("/productSearch", async (req, res) => {
      try {
        const searchText = req.query.search || "";
        // const filter = req.query.filter || "";
        // const publishFilter = req.query.publisherFilter || "";


        let query = {
          productName: { $regex: searchText, $options: 'i' },
        };

        // if (filter) {
        //   query['tags.label'] = filter;
        // }
        // if (publishFilter) {
        //   query['publisher.label'] = publishFilter;
        // }
    
        // console.log("Query:", query);
        const result = await productCollection.find(query).toArray();
        res.send({ result });
      } catch (error) {
        res.status(404).send({ error });
      }
    });
    

  


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

 
app.get('/', (req, res) => {
  res.send('Product Management server')
})

app.listen(port, () => {
  console.log(`Product Management Server is running on port: ${port}`)
})