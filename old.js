// const express = require('express')
// const morgan=require('morgan')
// const app = express()
// const port = 3000

// app.use(express.static('./views'))

// app.use(morgan('dev'))

// app.get('/', (req, res) => {
//   res.send('homePage')
// })
// app.get('/product', (req, res) => {
//   res.send([
//     {id:1 ,name: 'mobiel'},
//     {id:2 ,name: 'mobiel2'}
//   ])
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const http = require('http');

// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     // res.setHeader('Content-Type', 'text/plain');

//     res.write(JSON.stringify({
//         id:1,
//         title:"Hello"
//     }))
//     res.end('Hello World');
// });

// server.listen(port,() => {
//     console.log('listening on port')
// });