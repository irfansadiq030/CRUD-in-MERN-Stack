const app = require('./app')
const connectDB = require('./config/database');

// Connecting DB
connectDB()


app.listen(3500, () => {
    console.log(`Server Running at PORT : 3500`)
})