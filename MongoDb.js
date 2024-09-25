const mongodb=require('mongodb')

const connectionUrl="mongodb://127.0.0.1:27017/NoteGo" // 0.0.0.0:27017/name_of_collection //

const client=new mongodb.MongoClient(connectionUrl)

var db;

try{
    
    client.connect();
    console.log("Connected to Mongodb")
    db=client.db()
}

catch(err)
{
    console.log(err)
}

module.exports=db