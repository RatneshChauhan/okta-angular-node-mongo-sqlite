import { NextFunction, Request, Response, Router } from 'express';
const Note = require('../models/note');
export const router: Router = Router();


router.get('/notes', async (req, res) => {

    const notes = await Note.find().sort('-createdAt');
    console.log('Getting All Notes...' + notes);
    res.send(notes);
});


router.post('/newNote', async (req, res) => {
    console.log('Adding New Note...' + req.body.title);
    let note = await new Note({
        title: req.body.title,
        description: req.body.description,
        createdAt: req.body.createdAt
    });
    
    const filter = { title: req.body.title };
    const update = {
        description: req.body.description,
        createdAt: req.body.createdAt
    };

    try {
        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        let doc = await Note.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log('NEW DOC: ',doc)
        res.redirect('/notes');
    } catch (e) {
        console.log(e);
    }
});

router.delete('/deleteNote/:id', async function (req: Request, res: Response, next: NextFunction) {
    console.log('Deleting  Note...', req.params);

    try {
        Note.findOneAndRemove({ _id: req.params.id }, (err) => { err ? res.send('ERROR') : res.send('OK'); })
    }
    catch (err) {
        return next(err);
    }
});