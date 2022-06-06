import NoteModel from "../models/notes-model.js"

class NotesController{
    // Create notes
    static createNote = async (req, res) => {
        const { title, content } = req.body

        if(title.length > 0 || content){
            try {
                const doc = await NoteModel({ userId: req.user._id, title, content })
                await doc.save()
                res.json({ status: 'success', message: 'Note created' })
            } catch (error) {
                res.json({ status: 'failed', message: 'Internal Server Error' })
            }
        }else{
            res.json({ status: 'failed', message: 'Sorry blank note not create' })
        }
    }

    // Read notes
    static readNotes = async (req, res) => {
        const userId = req.user._id

        try {
            const notes = await NoteModel.find({userId})
            res.json({ status: 'success', message: 'All notes', notes })
        } catch (error) {
            res.json({ status: 'failed', message: 'Internal Server Error' })
        }
    }

    // Delete notes
    static deleteNotes = async (req, res) => {
        const noteId = req.params.id

        const note = await NoteModel.findById(noteId)
        if(note){
            await NoteModel.findByIdAndDelete(noteId)
            res.json({ status: 'success', message: 'Note deleted'})
        }else{
            res.json({ status: 'failed', message: 'No note exist' })
        }
    }

    // Update notes
    static updateNotes = async (req, res) => {
        const noteId = req.params.id
        const {title, content} = req.body

        const note = await NoteModel.findById(noteId)
        if(note){
            await NoteModel.findByIdAndUpdate(noteId, {$set: {content, title}})
            res.json({ status: 'success', message: 'Note Updated'})
        }else{
            res.json({ status: 'failed', message: 'No note exist' })
        }
    }
}

export default NotesController