// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient //Iniatialize the connection
const {MongoClient,ObjectId}=require('mongodb') //Destructuring mongodb is an object and MongoClient and ObjectId are properties.

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

// const id=new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if(error){
        return console.log('Unable to connect to database')
    }

    const db=client.db(databaseName)

    // db.collection('users').insertMany([
    //     {
    //         name:'Ganesh',
    //         age:21
    //     },
    //     {
    //         name:'Krushna',
    //         age:19
    //     }
    // ],(error,result)=>{

    //     if(error){
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)// result.ops is array of documents
    // }
    // db.collection('tasks').insertMany([
    //     {
    //         description:'Home work',
    //         completed:true
    //     },
    //     {
    //         description:'sports',
    //         completed:true
    //     },
    //     {
    //         description:'Playing video games ',
    //         completed:false
    //     }
    // ],(error,result)=>{
        
    //     if(error){
    //         return console.log('Unable to insert the document')
    //     }

    //     console.log(result.ops)
    // })  

    // db.collection('tasks').findOne({_id:new ObjectId('5e4b62fd716194250c342906')},(error,user)=>{
    //     console.log(user)
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('tasks').updateMany({completed:false},
    //     {$set:{completed:true}}).then((results)=>{
    //         console.log(results)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    db.collection('tasks').deleteOne({description:'Home work'}).then((results)=>{
        console.log(results)
    }).catch((error)=>{
        console.log(error)
    })

})