import mongoose from 'mongoose'

const connectDB = async(MONGO_URI) => {
    try {
        const dbName = 'all_note_safe'
        await mongoose.connect(MONGO_URI, {
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect Mongo Successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB