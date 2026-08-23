const express = require('express');
const app = express();
app.use(express.json());

const notes = [
    {
        "title" : " test title 1",
        "description": "T=test description 1"
    },

    {
        "title" : "title 2",
        "description": "T=test description 2"
    }
]

//POST /notes */
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("Notes created successfully");
})

//GET /notes */
app.get("/notes",(req, res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("Server is runnig on port 3000");
})

/*DELETE /notes */
/*params*/ 

/* DELETE /notes/3 */
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted successfully")

})

/*PATCH /notes/:index */
/*req.body = {description :-"sample modified description"} */

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Note updated Successfully")
})

module.exports = app;