require('../src/db/mongoose')
const User=require('../src/models/Users')

// 5e92d7711e41ea090c44c5e6

// User.findByIdAndUpdate('5e92d7711e41ea090c44c5e6',{age:20}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:20})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAndCount= async (id, age)=>{

    const updatedUser= await User.findByIdAndUpdate(id,{age})
    const count=await User.countDocuments({age})
    return count
}

updateAndCount('5e92d7711e41ea090c44c5e6',21).then((result)=>{
    console.log('Result',result)
}).catch((e)=>{
    console.log('e',e)
})