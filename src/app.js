const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars and viewspath
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup the static directory path
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title:'Weather app',
        name:'Siddharth Shankar'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:'Weather app',
        name:'Siddharth Shankar'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    

    geocode(req.query.address, (error,{longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
              error
            })
        }
    
        forecast(latitude, longitude, (error,{description, temperature, feelslike, humidity} = {}) => {
            if(error){
                return res.send({error})
            }
    
            console.log(req.query)
            res.send({
                forecast: description + " .It is currently " + temperature  + " degrees outside. But it feels like " + feelslike + " degrees. The humidity outside is " + humidity + "%." ,
                location,
                address:req.query.address
            })


            
        })
    
    })

})


app.get('/help',(req,res) => {
    res.render('help', {
        title:'Get help',
        message:'Get any kind of help you want to get',
        name:'Siddharth Shankar'
    })
})


app.get('/help/*', (req, res) => {
    res.render('error_404', {
        error: '404 Help article was not found'
    })
})

app.get('*', (req, res) => {
    res.render('error_404', {
        error: '404 page not found'
    })
})

// app.get('', (req, res) => {
//     res.send("<h1>Hello welcome to express!</h1>")
// })

// app.get('/help', (req, res) => {
//     res.send([{name: 'Siddharth'}, {name: 'Shyam'}])
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>This is a weather checking app</h1>")
// })


// app.get('/weather', (req, res) => {
//     if(!req.query.address){
//         return res.send({
//             error:"You must provide an address"
//         })
//     }
    
//     console.log(req.query)
//     res.send([{forecast: 'Overcast. It is 50 degrees.'}, {location: 'Philadelphia'}])
// })
//app.com
//app.com/help


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
