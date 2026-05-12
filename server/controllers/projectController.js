// Placeholder for Project Controller
const projects = [
  { id: '1', name: 'Rudra Heights', status: 'Active', budget: '2.5Cr', completion: 65 },
  { id: '2', name: 'Skyline Bridge', status: 'Planning', budget: '10Cr', completion: 0 },
  { id: '3', name: 'Green Valley Villas', status: 'On Hold', budget: '1.2Cr', completion: 30 },
];

exports.getAllProjects = async (req, res) => {
  res.status(200).json(projects);
};

exports.createProject = async (req, res) => {
  const newProject = { ...req.body, id: Date.now().toString() };
  projects.push(newProject);
  res.status(201).json(newProject);
};

exports.getProjectById = async (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.status(200).json(project);
};
