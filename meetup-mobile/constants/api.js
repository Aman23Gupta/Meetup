export const fetchMeetups = () => fetch("http://eb992dfe.ngrok.io/api/meetups").then(res => res.json());