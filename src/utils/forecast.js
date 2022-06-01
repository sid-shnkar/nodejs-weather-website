const request=require('request')

const forecast=(latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=35b80be133e8137740b2ff753bc2ea69&query=' +encodeURIComponent(longitude) +',' + encodeURIComponent(latitude)+'&units=f'
    request({url, json:true}, (error, {body}={}) => {
        if(error){
      callback("Unable to connect to weather service", undefined)
        }else if(body.error){
       callback("Unable to find location", undefined)
        }else{
        callback(undefined, {
            description:body.current.weather_descriptions[0],
            temperature:body.current.temperature,
            feelslike:body.current.feelslike,
            humidity:body.current.humidity
            //response.body.current.weather_descriptions[0] + " .It is currently " + response.body.current.temperature + " degrees outside. But it feels like " +  response.body.current.feelslike + " degrees." 
        }
        )
        }
    })

}

module.exports=forecast