const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const myDb = require('./MongoDb')
const axios = require('axios')
const App = new express()
const PORT = 9000
const PhysicsCyclePdf = require("./PhysicsCyclePdf")
const ChemistryCyclePdf = require("./ChemistryCyclePdf")

App.use(cors({origin:"*"}))
App.use(bp.json())
App.use(express.urlencoded({ extended: false}))

App.use("/api/PhysicsCycle", PhysicsCyclePdf)
App.use("/api/ChemistryCycle", ChemistryCyclePdf)

// New route for proxying PDF requests
App.get('/proxy', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Range': req.headers.range
            }
        });
        
        res.set(response.headers);
        res.status(response.status);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).send('Error fetching PDF');
    }
});

App.post("/api/GetPhysicsCycleSubjects", async (req, resp) => {
    const PhysicsCycleCollection = myDb.collection("PhysicsCycle")

    const SearchedSubject = req.body.SubjectName
    console.log(SearchedSubject)

    const regex = new RegExp(SearchedSubject, 'i'); 

    const Subjects = await PhysicsCycleCollection.find({ SubjectName: regex }).toArray();

    console.log(Subjects)

    resp.send(Subjects);
})

App.post("/api/GetChemistryCycleSubjects", async (req, resp) => {
    const ChemistryCycleCollection = myDb.collection("ChemistryCycle")

    const SearchedSubject = req.body.SubjectName
    console.log(SearchedSubject)

    const regex = new RegExp(SearchedSubject, 'i'); 

    const Subjects = await ChemistryCycleCollection.find({ SubjectName: regex }).toArray();

    console.log(Subjects)

    resp.send(Subjects);
})


App.post("/api/LabVideos", async (req, resp) => {

    const LabCollection = myDb.collection("LabVideos")


    const Videos = await LabCollection.find({}).toArray();

    console.log("Coming or not")
    resp.send(Videos);
})



App.listen(PORT, err => {
    if (err)
        console.log(err)
    else
        console.log("Server Running at port " + PORT)
})
