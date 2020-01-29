import mongoose, { Schema } from 'mongoose';

const MeetupSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'title must be of length 5']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'description must be of length 10']
    },
    eventDate: {
        type: Date,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, { timestamps: true });

export default mongoose.model('Meetup', MeetupSchema);