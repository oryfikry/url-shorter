import connectDB from '../../lib/db';
import Url from '../../models/Url';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { originalUrl } = req.body;

    // Generate a unique short ID
    let shortId;
    let exists;
    do {
      shortId = nanoid(7); // Generates a 5-character unique ID
      exists = await Url.findOne({ shortId });
    } while (exists);

    // Save to database
    const url = new Url({ shortId, originalUrl });
    await url.save();

    res.status(200).json({ shortId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}