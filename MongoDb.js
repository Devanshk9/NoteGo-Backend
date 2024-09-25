const mongodb=require('mongodb')

const connectionUrl="mongodb+srv://devanshkhetan9:eGujuNNcNbF2UZda@cluster0.iamg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" // 0.0.0.0:27017/name_of_collection //

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
