const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
    try {
        const resources = await Project.get()
        console.log("resources", resources);
        console.log(req.query)
        res.status(200).json(resources)
    } catch {
        res.status(500).json({error: " no projects"})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const oneResource = await Project.get(req.params.id)
        console.log("one resource", oneResource);
        if (oneResource) {
            res.status(200).json(oneResource)
        } else {
            res.status(404).send(`ould not be found`)
        }
       
    } catch {
        res.status(500).json({error: " no projects"})
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const projectId = req.params.id;
        const getActionPosts = await Project.getProjectActions(projectId)
        if (getActionPosts[0]) {
            res.status(200).json(getActionPosts)
            console.log(getActionPosts)
        }  else {
            res.status(404).json({message: 'action id does not exist '})
        }
    } catch {
        res.status(500).json({error: "Could not list actions of the project"})
    }
})

router.post('/', async (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
    res.status(404).json({error: " enter a name and description!"})
    }

    try {
        const newProject = await Project.insert(req.body);
        console.log(newProject)
        if (newProject){
            res.status(201).json(newProject)
            console.log("added successfully", newProject)
        } 
    } catch {
        res.status(500).json({error: "issue with inserting a new project"})
    }
});

router.put('/:id', async (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
        res.status(404).json({error: " enter  name and description!"})
        }

        try {
            const project = req.body;
            const editProject = await Project.update(req.params.id, project);
            console.log(editProject)
            if (editProject){
                res.status(201).json(editProject)
                console.log("Edited:", editProject)
            } 
        } catch {
            res.status(500).json({error: "issue with editing project"})
        }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deleteProject = await Project.remove(id)
        res.status(404).json({message: 'did not find projects'})

    } catch {
        res.status(500).json({error: 'Server issue '})
    }
});

module.exports = router;