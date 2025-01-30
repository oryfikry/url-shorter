import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

export default mongoose.models.Url || mongoose.model('Url', urlSchema);