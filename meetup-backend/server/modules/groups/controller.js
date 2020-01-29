import Group from './model';
import { Meetup } from '../meetups';

export const createGroup = async (req, res) => {
    const { name, description, category } = req.body;

    if(!name) {
        return res.status(400).json({error: true, message: 'Name must be provided'});
    } 
    else if(typeof name !== 'string') {
        return res.status(400).json({ error: true, message: 'Name must be string' });
    }
    else if (name.length < 5) {
        return res.status(400).json({ error: true, message: 'Name must have length 5' });
    }

    if(!description) {
        return res.status(400).json({error: true, message: 'description must be provided'});
    } 
    else if(typeof description !== 'string') {
        return res.status(400).json({ error: true, message: 'description must be string' });
    }
    else if (description.length < 10) {
        return res.status(400).json({ error: true, message: 'description must have length 10' });
    }

    const group = new Group({ name, description });

    try {
        return res.status(201).json({ error: false, group: await group.save() })
    } 
    catch(e) {
        return res.status(400).json({ error: true, message: 'error when created group' });
    }
};

export const createGroupMeetup = async (req, res) => {
    const { title, description } = req.body;
    const { groupId } = req.params;

    if (!title) {
        return res.status(400).json({ error: true, message: 'title must be provided' });
    }
    else if (typeof title !== 'string') {
        return res.status(400).json({ error: true, message: 'title must be string' });
    }
    else if (title.length < 5) {
        return res.status(400).json({ error: true, message: 'title must have length 5' });
    }

    if (!description) {
        return res.status(400).json({ error: true, message: 'description must be provided' });
    }
    else if (typeof description !== 'string') {
        return res.status(400).json({ error: true, message: 'description must be string' });
    }
    else if (description.length < 10) {
        return res.status(400).json({ error: true, message: 'description must have length 10' });
    }

    if (!groupId) {
        return res.status(400).json({ error: true, message: 'groupId must be provided' });
    }

    try {
        //Group.addMeetup(groupId, { title, description });
        const {meetup, group} = await Group.addMeetup(groupId, {title, description});
        //console.log(result);
        return res.status(201).json({ error: false, meetup, group });
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Meetup cannot be created' });
    }

}

export const getGroupMeetups = async (req, res) => {
    const { groupId } = req.params;
    if(!groupId) {
        return res.status(400).json({ error: true, message: 'you need too provide group id' });
    }

    const group = await Group.findById(groupId);
    if(!group) {
        return res.status(400).json({ error: true, message: 'group not exist' });
    }

    try {
        return res.status(200).json({ error: false, meetups: await Meetup.find({ group: groupId }).populate('group', 'name') });
    } catch (error) {
        return res.status(400).json({ error: true, message: 'cannot fetch meetup' });
    }
}