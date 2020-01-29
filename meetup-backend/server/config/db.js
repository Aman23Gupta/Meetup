import mongoose from 'mongoose';
import { mongoURI } from '../../ignore/mongouri';
 
export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${mongoURI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    let db = mongoose.connection;
    db.on('error', err => console.log(err));
    db.once("open", () => console.log("Mongodb running"));
};