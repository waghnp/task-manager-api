require('../src/db/mongoose')
const tasks=require('../src/models/Tasks')

// tasks.findByIdAndDelete('5e8c9571cf620c103008ce13').then((task)=>{
//     console.log('Task Removed')

//     return tasks.countDocuments({completed:false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const DeleteAndCount= async (id)=>{
    const DeletedTask=await tasks.findByIdAndUpdate(id)
    const count = await tasks.countDocuments({completed:false})
    return count
}

DeleteAndCount('5e8c9571cf620c103008ce13').then((result)=>{
    console.log('Result',result)
}).catch((e)=>{
    console.log('e',e)
})