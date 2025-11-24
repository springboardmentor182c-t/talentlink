const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for demo purposes
const projects = new Map();

// Create project
app.post('/api/projects', upload.single('file'), (req, res) => {
  const id = nanoid();
  const { title, description, budget, duration, skills } = req.body;
  const project = { id, title, description, budget, duration, skills: skills ? skills.split(',') : [], file: req.file ? req.file.filename : null, createdAt: Date.now() };
  projects.set(id, project);
  res.status(201).json(project);
});

// Read project
app.get('/api/projects/:id', (req, res) => {
  const p = projects.get(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Update project
app.put('/api/projects/:id', upload.single('file'), (req, res) => {
  const p = projects.get(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  const { title, description, budget, duration, skills } = req.body;
  p.title = title ?? p.title;
  p.description = description ?? p.description;
  p.budget = budget ?? p.budget;
  p.duration = duration ?? p.duration;
  p.skills = skills ? skills.split(',') : p.skills;
  if (req.file) p.file = req.file.filename;
  projects.set(p.id, p);
  res.json(p);
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  const ok = projects.delete(req.params.id);
  res.json({ deleted: ok });
});

// List + search projects (filters: skill, minBudget, maxBudget, duration)
app.get('/api/projects', (req, res) => {
  const { skill, minBudget, maxBudget, duration } = req.query;
  let out = Array.from(projects.values());
  if (skill) {
    out = out.filter(p => p.skills && p.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()));
  }
  if (minBudget) out = out.filter(p => Number(p.budget) >= Number(minBudget));
  if (maxBudget) out = out.filter(p => Number(p.budget) <= Number(maxBudget));
  if (duration) out = out.filter(p => String(p.duration) === String(duration));
  res.json(out);
});

// Serve small demo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
