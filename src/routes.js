const express = require("express");

const routes = express.Router();

const projects = [];
let cont = 0;

function projectExists(req, res, next) {
  const { id } = req.params;

  const index = projects.find(project => project.id === id);

  if (!index) {
    return res.status(400).send(`No project found for the ID ${id}`);
  }

  next();
}

function countRequests(req, res, next) {
  cont++;
  console.log(
    `${cont} ${cont === 1 ? "request" : "requests"} made to the server.`
  );
  next();
}

routes.use(countRequests);

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.find(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

routes.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;

  projects = projects.filter(project => project.id !== id);

  return res.send();
});

routes.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let responseProject;

  projects.find(project => {
    if (project.id === id) {
      project.tasks.push(title);
      responseProject = project;
    }
  });

  return res.json(responseProject);
});

module.exports = routes;