const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-crud', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("DB Connected successFully..")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB