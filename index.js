const express = require("express")
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())


const users = []   

const myFirstMiddleware = (request, response, next)=>{ 
   const  {id} = request.params

   const index = users.findIndex(usar => usar.id === id)

   if(index < 0){
      return response.status(404).json({error: "not found"}) 
   }
   request.userIndex = index
   request.userId = id
    next()
}
     

app.get('/users', (request, response) => {
   return response.json({users})
}) 

app.post('/users', (request, response) => {
   const {name,age } = request.body
   const user = {id:uuid.v4(),name, age}
   users.push(user)
   return response.status(201).json(user)
})

app.put('/users/:id',myFirstMiddleware, (request, response) => {
   const {name, age} = request.body
   const index = request.userIndex 
   const id = request.userId

   const upDateUser = {id, name, age}

  users[index] = upDateUser
return response.json(upDateUser)


   return response.json(users)
}) 

 app.delete('/users/:id',myFirstMiddleware,(request,response)=>{
   const {id }= request.params
   const index = users.findIndex(user => user.id === id)
    
   if(index < 0){
      return response.status(404).json({message: "not found"})}

      users.splice(index,1)

       return response.status(204).json()
 
 
   })
 app.listen(port,() =>{
    console.log(`😎 server starded on port ${port}`)
 })


