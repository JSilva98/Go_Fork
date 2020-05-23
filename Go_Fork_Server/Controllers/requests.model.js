const Requests = require('../Models/requests.model.js')

async function get(req, res){
    const requests = req.query

    try{
        if(clothing.id) {
            return res.send(await Requests.find({_id: requests.id}))
        } else {
            return res.send(await Requests.find())
        }
    } catch(err) {
        return res.status(400).send({ error: `Could not get requests: ${err}`})
    }
}

async function post(req, res) {
    try {
        Requests.create(req.body)
        return res.send()
    }

    catch (err) {
        return res.status(400).send({ error: `Could not create requests: ${err}` })

    }
}

async function del(req, res){
    const _id = req.params.id

    try{
        await Requests.findByIdAndDelete(_id)
        return res.send('Removed')
    } catch(err){
        return res.status(400).send({ error: `Could not remove requests: ${err}`})
    }
}


module.exports = {get, post, del}