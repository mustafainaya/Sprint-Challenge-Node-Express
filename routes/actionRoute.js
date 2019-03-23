const express = require('express');

const router = express.Router();

const Action = require('../data/helpers/actionModel');

const descriptionLimit = (req, res, next) => {
    const stringLimit = req.body.description.length;
    const count = 100;
    if (stringLimit > count) {
        return res.status(404).json({message: 'fetching'})
    }
    next();
}

router.get('/', async (req, res) => {
    try {
        const resources = await Action.get()
        res.status(200).json(resources)
    } catch {
        res.status(500).json({error: "no actions"})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const oneAction = await Action.get(req.params.id)
        
        if (oneAction) {
            res.status(200).json(oneAction)
        } else {
            res.status(404).send(`no action `)
        }
       
    } catch {
        res.status(500).json({error: "no action"})
    }
});


router.post('/', descriptionLimit, async (req, res) => {
    const {description, project_id, notes} = req.body;
    if (!description || !project_id || !notes) {
    res.status(404).json({error: "missing data"})
    }

    try {
        const newAction = await Action.insert(req.body);
       if (newAction){
            res.status(201).json(newAction)
            
        } 
    } catch {
        res.status(500).json({error: "issue with inserting a new action, try again!"})
    }
});

router.put('/:id', async (req, res) => {
    const {description, project_id, notes} = req.body;
    if (!description || !project_id || !notes) {
        res.status(404).json({error: "Must enter a description, note, and project id in order to edit"})
        }

        try {
            const action = req.body;
            const editAction = await Action.update(req.params.id, action);
            console.log(editAction)
            if (editAction){
                res.status(201).json(editAction)
                console.log("Edited:", editAction)
            } 
        } catch {
            res.status(500).json({error: "issue with action"})
        }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deleteAction = await Action.remove(id)
        res.status(404).json({message: 'Action was deleted!'})

    } catch {
        res.status(500).json({error: 'Server issue '})
    }
});

module.exports = router;