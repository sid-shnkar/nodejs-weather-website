
// console.log("Client side JAVASCRIPT file loaded successfulyy!!")

// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// http://localhost:3000/weather?address=boston

// fetch('http://localhost:3000/weather?address=boston').then((response) =>{
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }

//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address=search.value

    //console.log('testing!')
    //console.log(address)
    messageOne.textContent='Loading...Please Wait'
    messageTwo.textContent=''

    fetch('/weather?address=' + address).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            // console.log(data.error)
            messageOne.textContent=data.error
        }else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }

    })
})


})