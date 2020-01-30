import axios from 'axios';

axios.defaults.baseURL = "http://de30e63b.ngrok.io/api";

const fakegroupId = "5e2da263ca431c38d4a7549d";

class MeetupApi {
    constructor() {
        this.groupId = fakegroupId;
        this.path = `/groups/${this.groupId}/meetups`;

    }
    async fetchGroupMeetup() {
        const { data } = await axios.get(this.path);
        
        return data.meetups;
    }
}

export {
    MeetupApi
};