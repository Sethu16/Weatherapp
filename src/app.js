var express = require('express')
var path = require('path')
var app =express();
const hbs = require('hbs')
var geocode = require('./utils/geocode.js')
var forecast = require('./utils/forecast.js')
var request = require('request')

var publicdirectory = path.join(__dirname,'../public')
var viewpath = path.join(__dirname,'../templates/views')
var partialpath = path.join(__dirname,'../templates/partials')
var port=process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(publicdirectory))
hbs.registerPartials(partialpath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'Sethu'
    })
    })

    app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return(res.send('Address needed'))
        }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,{weather,temperature})=>{
                if(error){
                    return res.send({error})
                }
                res.send('Loaction: '+location+'<br /> Longitude: '+longitude+'<br />latitude: '+latitude+'<br />Weather: '+weather+'<br />Temperature: '+temperature+'<br />Address: '+req.query.address)
            })
        })
})

    app.get('/help',(req,res)=>{
        res.render('help',{
            helpmessage:'How can I help you?',
            title:'HELP',
            name:'sethu'
        })
    })

    app.get('/help/*',(req,res)=>{
        res.render('404',
        {title:'article not found',
            name:'sethu'})
    })

    app.get('*',(req,res)=>{
        res.render('404',
        {title:'404 page not found',
    name:'sethu'})
    })

   


app.listen(port,'127.0.0.1',()=>{
    console.log('listening'+port)
})                                                                                                              