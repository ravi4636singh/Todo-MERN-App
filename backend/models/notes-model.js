import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, default: 'No Title' },
    content: { type: String }
}, { timestamps: true,  })

const NoteModel = mongoose.model('note', noteSchema)

export default NoteModel