import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: 'String',
  },
  place: {
    type: 'String',
  },
  datetime: {
    type: 'String',
  },
});

const events = mongoose.models.events || mongoose.model('events', eventSchema);
export default events;
