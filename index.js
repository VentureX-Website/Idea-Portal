var express = require("express")
var bodyParser = require("body-parser")
const mongoose = require("mongoose")
const DB = 'mongodb+srv://harsha:Spectator@cluster0.9azan.mongodb.net/Idea?retryWrites=true&w=majority'
const port = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
    // useFindAndModify:false
}).then(()=>{
    console.log('connection was succesful');
}).catch((err) => console.log(err));



var db = mongoose.connection;

// db.on('error', ()=>console.log("Error in connection to db"));
// db.once('open', ()=>console.log("connected"));

app.post("/confirm", (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "message": message
    }
    db.collection('Ideas').insertOne(data, (err, collection) => {
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('confirmation.html')
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port, () => {
    console.log(`listening to port no at ${port}`);
});

console.log("Listening on port 3000");