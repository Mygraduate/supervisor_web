'use strict'

const express   = require('express')
const app       = express()

//
app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})
app.use(express.static(__dirname + '/public'));

// APIS
app.get('*', (req, res) => {res.sendFile(__dirname + '/index.html')})


app.listen(80, () => {
    console.log(`app is listening at port:80`)
})
