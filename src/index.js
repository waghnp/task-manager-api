const express=require('express')
require('./db/mongoose')
const UserRouters=require('./routers/user')
const TaskRouters=require('./routers/task')


const app= express()
const port= process.env.PORT || 3000

app.use(express.json())

app.use(UserRouters)

app.use(TaskRouters)


app.listen(port,()=>{
    console.log('server is up on port ',port)
})


// const bcrypt=require('bcryptjs')

// const myFunction=async ()=>{
//     const password='Nilesh123'

//     const hashPassword= await bcrypt.hash(password,8)

//     const isMatch= await bcrypt.compare('NILESH123',hashPassword)

//     console.log(isMatch)
// }

// myFunction()

const tasks=require('./models/Tasks')
const User=require('./models/Users')

const main = async ()=>{
    // const task=await tasks.findById('5ecc96aacbeaa810f01b2dff')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
    const user=await User.findById('5ecc968fcbeaa810f01b2dfd')
    await user.populate('usertasks').execPopulate()
    console.log(user.usertasks)
}

main()