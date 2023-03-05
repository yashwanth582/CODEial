const mongoose  = require('mongoose')
const env = require('./environment')
// mongoose.connect(`mongodb://localhost/codeial_development`)
// mongoose.connect(`mongodb://localhost:8000`)
// mongoose.connect('mongodb://localhost/codeial_development', {
mongoose.connect("mongodb+srv://94818yashwanth:Yash@2020@cluster0.z0jwq7r.mongodb.net/?retryWrites=true&w=majority", {

useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

// mongoose.set('strictQuery', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDb"));

db.once('open', function(){
    console.log('connected to the database :: MongoDB ')
})

module.exports = db; 