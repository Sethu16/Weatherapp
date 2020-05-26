var request = require('request')

var forecast=(latitude,longitude,callback)=>{
var url='http://api.weatherstack.com/current?access_key=74d6f23b2608e88e3057ef453bf16104&query='+ latitude +','+ longitude + '&untis=f'

request({url,json:true},(error,{body})=>{
    
    if(error){
        callback('cant reach',undefined)
    }else if(body.error){
        callback('invalid latitude and longitude',undefined)
    }else{callback(undefined,{
        weather : body.current.weather_descriptions[0],
        temperature : body.current.temperature 
    })
        
    }
})
}

module.exports=forecast