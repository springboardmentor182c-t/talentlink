# TalentLink - Minimal Demo

This folder contains a minimal demo implementation for:

- Client Project Posting (CRUD API)
- Freelancer Project Search (filters: skill, budget, duration)

It is intentionally lightweight and uses an in-memory store for projects.

How to run

1. Install dependencies:

   npm install

2. Start server:

   npm start

3. Open in browser:

   http://localhost:3000/

Pages
- /client-post.html — Client can create projects using a form (files optional)
- /freelancer.html — Freelancer can search projects by skill, budget and duration

API
- POST /api/projects — create (multipart/form-data)
- GET /api/projects — list with optional query params: skill, minBudget, maxBudget, duration
- GET /api/projects/:id — get single
- PUT /api/projects/:id — update
- DELETE /api/projects/:id — delete

Notes
- This is a demo. Projects are stored in memory and will reset when the server restarts.
- Commit and push the branch as needed.
# talentlink