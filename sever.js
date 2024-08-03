const { once } = require('events')
const e = require('express')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000


const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))


mongoose.connect('mongodb://127.0.0.1:27017/student1')
const db = mongoose.connection

db.once('open', () => {
    console.log("mongodb onnection scusefully")
})


const userSchema = new mongoose.Schema({
    regd_no: String,
    name: String,
    email: String,
    branch: String

})

const users = mongoose.model("dta", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/post', async (req, res) => {
    const { regd_no, name, email, branch } = req.body
    const user = new users({
        regd_no,
        name,
        email,
        branch
    })

    await user.save()
    console.log(user)
    res.send("form submision scusesfull")
})

app.listen(port, () => {
    console.log("server started")
})