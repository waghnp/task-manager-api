const express=require('express')
const tasks=require('../models/Tasks')
const auth=require('../middleware/auth')

const router= new express.Router()


router.get('/tasks/:id',auth, async (req,res)=>{

    const _id=req.params.id

    try{
        const task=await tasks.findOne({_id,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send()
    }
    // tasks.findById(req.params.id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

 router.get('/tasks',auth, async (req,res)=>{
    
    const match={}
    const sort={}

    if(req.query.completed){
        match.completed= req.query.completed==='true'
    }
    if(req.query.sortBy){

        const parts=req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]==='desc'? -1 : 1
    }
    try{
      
        await req.user.populate({
            path:'usertasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.usertasks)
    }catch(e){
        res.status(500).send()
    }
    // tasks.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
}) 
router.post('/tasks',auth, async (req,res)=>{
    // const task=new tasks(req.body)

    const task=new tasks({
        ...req.body,
        owner:req.user._id
    })
    try{
        const Task= await task.save()
        res.status(201).send(Task)
    }catch(e){
        res.status(400).send(e)
    }
 //    task.save().then(()=>{
 //        res.send(task)
 //    }).catch((error)=>{
 //         res.status(400).send(error)
 //    })
 })
router.patch('/tasks/:id', auth ,async (req,res)=>{

    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']

    const isValidOperation=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalide Property"})
    }

    try{
        const task=await tasks.findOne({ _id : req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send("Task Not Found")  
        }
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }

})

router.delete('/tasks/:id',auth,async (req,res)=>{

    try{

        const task=await tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send('Task is Not available')
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router