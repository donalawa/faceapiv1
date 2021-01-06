require('dotenv').config()
let express = require('express'),
    app = express(),
    path = require('path')
loginRoute = require('./routes/loginRoute'),
    registerRoute = require('./routes/registerRoute'),
    deleteRoute = require('./routes/removeImage'),
    cors = require('cors');

   
app.use(cors())
  
  
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.urlencoded({ extended: true }))
app.get('/api', (req, res) => res.json({ status: "Server Running" }))

app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/api', deleteRoute)


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
})