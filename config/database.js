if(process.env.NODE_ENV === "production"){
    module.exports = {
        mongoURI : "mongodb+srv://jimmy:jimmy@cluster0.ekkyy.mongodb.net/jimmy-vidjot-prod?retryWrites=true&w=majority"
    }
}else{
    module.exports = {
        mongoURI : "mongodb://localhost/jimmy-vidjot-dev"
    }
}

//
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jimmy:<password>@cluster0.ekkyy.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

