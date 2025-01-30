import connectDB from '../../lib/db';
import Url from '../../models/Url';

export default async function handler(req, res) {
  const { shortId } = req.query;

  await connectDB();

  try {
    const url = await Url.findOne({ shortId });

    if (url && url.originalUrl) {
      // Ensure original URL starts with either http:// or https://
      let originalUrl = url.originalUrl;
      if (!/^https?:\/\//i.test(originalUrl)) {
        originalUrl = `https://${originalUrl}`; // Default to HTTPS
      }

      return res.redirect(302, encodeURI(originalUrl));
    } else {
      return res.status(404).json({ error: 'Link not found' });
    }
  } catch (error) {
    console.error('Error fetching URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
