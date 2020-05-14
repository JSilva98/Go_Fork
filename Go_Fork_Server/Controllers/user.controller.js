const User = require('../Models/user.model.js')

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

async function del(req, res){
    const _id = req.params.id

    try{
        await User.findByIdAndDelete(_id)
        return res.send('Removed')
    } catch(err){
        return res.status(400).send({ error: `Could not remove user: ${err}`})
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

module.exports = {get, del, put}