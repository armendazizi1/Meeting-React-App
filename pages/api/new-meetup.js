import {MongoClient} from 'mongodb'

const MONGODB_URI='mongodb://localhost:27017/meetup-react'
const MONGODB_DB= 'meetup-react'

async function handler(req, res){
  if(req.method === 'POST'){
    const data = req.body;

    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    
    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
  }
}

export default handler;