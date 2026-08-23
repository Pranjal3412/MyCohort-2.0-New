const express = require('express')

const app = express()
app.use(express.json())
 

const notes = []


/*POST /notes */
app.post('/notes',(req,res)=>{
   notes.push(req.body)
    
   res.status(201).json({
    message:"Notes created successfully"
   })
})
/*GET /notes */
app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

/*DELETE /notes/:index */
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.status(204).json({
        message:"Note delete Successfully"
    })
})

/*PATCH /notes/:index */

app.patch("/notes/:indices",(req,res)=>{
    notes[req.params.indices].description = req.body.description
    res.status(200).json({
        message: "Note updated successfully."
    })
})


module.exports = app
