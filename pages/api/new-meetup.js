// api/new-mitup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
      'mongodb+srv://mitol5549:s5dV7PQTj1s9ZBvo@cluster0.8laixvg.mongodb.net/meetups?retryWrites=true&w=majority',
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
