import express from 'express'
import NotesController from '../controllers/notes-controllers.js'
import { isPermission } from '../middlewares/auth-middleware.js'

const noteRoutes = express.Router()

noteRoutes.use('/*', isPermission)

noteRoutes.post('/create-notes', NotesController.createNote)
noteRoutes.get('/read-notes', NotesController.readNotes)
noteRoutes.delete('/delete-notes/:id', NotesController.deleteNotes)
noteRoutes.put('/update-notes/:id', NotesController.updateNotes)

export default noteRoutes
