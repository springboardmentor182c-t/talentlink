Project Posting API — minimal backend for UI

This app implements the core endpoints used by the frontend UI for project posting and freelancer search.

Endpoints
- GET /api/projects/projects/                 -> list (management/listing)
- POST /api/projects/projects/                -> create project (client)
- GET /api/projects/projects/{id}/            -> retrieve
- PUT /api/projects/projects/{id}/            -> update (client owner only)
- DELETE /api/projects/projects/{id}/         -> delete (client owner only)
- GET /api/projects/projects/search/?skill=..&min_budget=..&max_budget=..&duration=..
                                               -> search open projects (freelancer-facing)

Notes for the UI
- Client pages (create/edit/view/delete): use the standard CRUD endpoints.
- Freelancer project list & search: call the `search` endpoint with query params. `skill` is repeatable.

Fields on Project model (summary)
- title, description
- client (user FK)
- skills (list stored in JSONField)
- budget_min, budget_max
- duration_days
- status (posted/open/closed)

Keep this app minimal: only the model, serializer, views and urls are included. Admin, tests and extra helper files were removed per request.
