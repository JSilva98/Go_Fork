const User = require('../Models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function get(req, res){
    const user = req.query

    try{
        if(user.id) {
            return res.send(await User.find({_id: user.id}))
        } else {
            return res.send(await User.find().lean())
        }
    } catch(err) {
        return res.status(400).send({ error: `Could not get users: ${err}`})
    }
}

async function register(req, res) {
    console.log(req.body)
    let newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        foto: "https://i.imgur.com/6NIOn6z.jpg",
        type: 3
    })
    newUser.save((error) => {
        if (error) {
            console.log(error)
            return
        }
        else {
            res.status(201).send({ success: "Register Sucess" })
        }

    })
}

async function validate(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body.email)
        console.log("entrou")

        const user = await User.findOne({ email: email }).lean()

        if (!user) {
            console.log("user not found")
            return res.status(403).send({ error: "User not found" })
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (!passwordValid) {
            console.log("invalid password")
            return res.status(403).send({ error: "Password invalid" })
        }
        res.status(200).send({ Yey: "Done", user, token: jwtSignUser(user) })
        console.log("Logged in")
        

    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong" })

    }

}

async function del(req, res){
    const _id = req.params.id

    try{
        await User.findByIdAndDelete(_id)
        return res.send('Removed')
    } catch(err){
        return res.status(400).send({ error: `Could not remove user: ${err}`})
    }
}

async function post(req, res) {
    try {
        User.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create user: ${err}` })

    }
}

async function put(req, res) {
    try {
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    return res.status(400).send({ error: `Could not edit user: ${err}` })
                }
            }
        )
        return res.send("edited " + req.params.id)
    }

    catch (err) {
        return res.status(400).send({ error: `Could not edit user: ${err}` })

    }
}

module.exports = {get, del, put, post, validate, register}