const app = require('./src/app');
const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect("mongodb://Pranjal:pranjal_20@ac-06j1szf-shard-00-00.tplfq0d.mongodb.net:27017,ac-06j1szf-shard-00-01.tplfq0d.mongodb.net:27017,ac-06j1szf-shard-00-02.tplfq0d.mongodb.net:27017/?replicaSet=atlas-ey21ck-shard-0&ssl=true&authSource=admin")
    .then(() => {
        console.log("Connected to Database")
    })
    
}
connectToDB()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})