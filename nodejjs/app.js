
import express from 'express'
import bcrypt from 'bcrypt'

const app = express();

app.use(express.json())

const user = [{
    name: "BfRAHIM",
    email: "bbbbb@gmail.com",
    password: "hohos"
}]

app.post('/register', async (req, res)=>{
    try{
        //Find if user already exists
        const { name, email, password } = req.body
        const userExist = user.find(u => u.email === req.body.email)
        if (userExist){
            res.status(400).send('User already exists')
            return
        }
        console.log(req.body)
        //hash password
        const salt = await bcrypt.hash(password, 10)
        console.log(salt)
        user.push({
            name: req.body.name,
            email: req.body.email,
            password: salt
        })
        res.status(201).send('User created')
        console.log(user);
    }
    catch (err){
        res.status(500).send({message: err.message})
    }
})

app.post('/login', async (req, res)=>{
    try{
        const { email, password } = req.body
        const userExist = user.find(u => u.email === email)
        if (!userExist){
            res.status(400).send('User not found')
            return
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password)
        if (!isPasswordValid){
            res.status(400).send('Invalid password')
            return
        }
        res.status(200).send('Login success')

    }
    catch (err){
        res.status(500).send({message: err.message})
    }
})




//http methods
// //GET - retrive data
// app.get('/', (req, res)=>{
//     res.send('HOMEEE')
// })



// app.get('/hello', (req, res)=>{
//     res.send('HEllo world')
//     //create a new user
//     //get all users
//     //get a single user
//     //update a user
// })

// app.get('/users', (req, res)=>{
//     if (user.length == 0){
//         res.status(404).send('No user found')
//     }
//     res.status(200).send(user)
// })
// //POST

// app.post('/users', (req, res)=>{
//     console.log(req.body)
//     if (!req.body.name || !req.body.age){
//         res.status(400).send('Name and age is required')
//     }
//     // if user already exists
//     if (user.find(u => u.id === req.body.id)){
//         res.status(400).send('User already exists')
//     }
//     else
//     {

//         user.push(req.body)
//         res.status(201).send('create a new user')
//     }
// })
//PUT
//DELETE
// app.delete('/users/:id', (req, res)=>{
//     const { id } = req.params
//     const userIndex = user.findIndex(u => u.id === parseInt(id))
//     if (userIndex === -1){
//         res.status(400).send('User not found')
//         return
//     }
//     else
//     {
//         user.splice(userIndex, 1)
//         res.status(200).send('User deleted')
//     }
// })

app.listen(3000, ()=>{
    console.log("server started at port 3000");
})