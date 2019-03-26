const express = require('express');

const router = express.Router();

const project = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
	try {
		const resources = await project.get();

		res.status(200).json(resources);
	} catch (error) {
		res.status(500).json({ error: ' no projects' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const oneResource = await project.get(req.params.id);

		if (oneResource) {
			res.status(200).json(oneResource);
		} else {
			res.status(404).send(`ould not be found`);
		}
	} catch (error) {
		res.status(500).json({ error: ' no projects' });
	}
});

router.get('/:id/actions', async (req, res) => {
	try {
		const projectId = req.params.id;
		const getActionPosts = await project.getProjectActions(projectId);
		if (getActionPosts[0]) {
			res.status(200).json(getActionPosts);
		} else {
			res.status(404).json({ message: 'action id does not exist ' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Could not list actions of the project' });
	}
});

router.post('/', async (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		res.status(404).json({ error: ' enter a name and description!' });
	}

	try {
		const newProject = await project.insert(req.body);

		if (newProject) {
			res.status(201).json(newProject);
		}
	} catch (error) {
		res.status(500).json({ error: 'issue with inserting a new project' });
	}
});

router.put('/:id', async (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		res.status(404).json({ error: ' enter  name and description!' });
	}

	try {
		const project = req.body;
		const editProject = await project.update(req.params.id, project);
		console.log(editProject);
		if (editProject) {
			res.status(201).json(editProject);
			console.log('Edited:', editProject);
		}
	} catch (error) {
		res.status(500).json({ error: 'issue with editing project' });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deleteProject = await project.remove(id);
		if (deleteProject === 1) {
			res.status(404).json({ message: 'project was deleted' });
		} else {
			res.status(500).json({ message: 'was not a success' });
		}
		//  try {
		// const deleteAction = await Action.remove(id)
		// res.status(404).json({message: 'Action was deleted!'})

		// } catch {
		// res.status(500).json({error: 'Server issue '})
		// }
	} catch (error) {
		res.status(500).json({ error: 'Server issue ' });
	}
});

module.exports = router;
