import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Name must be of length 5']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be of length 10']
    },
    category: {
        type: String
    },
    meetups: [{
        type: Schema.Types.ObjectId,
        ref: 'Meetup'
    }]
}, { timestamps: true });

GroupSchema.statics.addMeetup = async function (id, args) {
    const Meetup = mongoose.model('Meetup');
    const meetup = await new Meetup({ ...args, group: id });

    const group = await this.findByIdAndUpdate(id, {$push: {meetups: meetup.id}});

    return {
        meetup: await meetup.save(),
        group
    }
    // console.log(result);
    return result;
    
}

export default mongoose.model('Group', GroupSchema);