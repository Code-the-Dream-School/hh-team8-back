# User Stories for Code the Dream Final Project Viewer/Uploader

## Anonymous User
1. **As an anonymous user, I want to register,**  
   so that I can access additional features like uploading or viewing private projects.
   - Preconditions: User visits the registration page.
   - Actions:
     - Enter email and password.
     - Submit the registration form.
   - Postconditions:
     - User receives a confirmation email.
     - Account is created and marked as "inactive" until confirmed.

2. **As an anonymous user, I want to view public projects,**  
   so that I can explore the work shared by the community.
   - Preconditions: Project must be marked as public.
   - Actions:
     - Navigate to the "Public Projects" section.
     - Browse the list of projects.
     - Click on a project to view details.
   - Postconditions:
     - User sees the project's description, GitHub link, and YouTube video.

---

## Registered User
1. **As a registered user, I want to log in,**  
   so that I can access my personalized dashboard.
   - Preconditions: User account must exist and be active.
   - Actions:
     - Enter email and password on the login page.
     - Submit the form.
   - Postconditions:
     - User is redirected to their dashboard.
     - Login session is maintained until logout or timeout.

2. **As a registered user, I want to view all projects,**  
   so that I can learn from or comment on other users’ work.
   - Preconditions: Projects are available in the system.
   - Actions:
     - Navigate to the "All Projects" page.
     - Use filters (e.g., by category or date) to find relevant projects.
     - Click on a project to see details.
   - Postconditions:
     - User can view the description, GitHub link, and embedded YouTube video.

3. **As a registered user, I want to upload my projects (if given permission),**  
   so that I can showcase my work to the community.
   - Preconditions: Admin must grant "upload" rights to the user.
   - Actions:
     - Click "Upload Project" on the dashboard.
     - Fill in project details (title, description, GitHub link, YouTube video).
     - Submit the form.
   - Postconditions:
     - Project is added to the system and marked as "pending" or "approved."

4. **As a registered user, I want to delete my own projects,**  
   so that I can remove outdated or incorrect content.
   - Preconditions: User must own the project.
   - Actions:
     - Navigate to the "My Projects" section.
     - Click "Delete" next to the project.
     - Confirm the deletion.
   - Postconditions:
     - Project is permanently removed.

---

## Admin User
1. **As an admin, I want to log in,**  
   so that I can manage the platform's content and users.
   - Preconditions: Admin account must exist.
   - Actions:
     - Enter admin credentials on the login page.
     - Submit the form.
   - Postconditions:
     - Admin is redirected to the admin dashboard.

2. **As an admin, I want to view all projects,**  
   so that I can monitor user submissions and ensure quality.
   - Preconditions: Projects exist in the system.
   - Actions:
     - Navigate to the admin "Project Management" page.
     - Use filters to find projects (e.g., by user, date, or status).
   - Postconditions:
     - Admin can view detailed project information.

3. **As an admin, I want to delete any project,**  
   so that I can remove inappropriate or irrelevant content.
   - Preconditions: Projects exist in the system.
   - Actions:
     - Locate the project in the admin dashboard.
     - Click "Delete" next to the project.
     - Confirm the deletion.
   - Postconditions:
     - Project is permanently removed.

4. **As an admin, I want to grant upload rights to registered users,**  
   so that they can share their projects with the community.
   - Preconditions: User account exists and is active.
   - Actions:
     - Navigate to the "User Management" page.
     - Select a user and enable "upload" permissions.
   - Postconditions:
     - User is notified about their new permissions.

---

### Project Details
- Each project should include:
  - **GitHub Link:** A clickable link to the project's codebase.
  - **Description:** A brief summary of the project (max 200 words).
  - **YouTube Video:** An embedded link showcasing the project demo.
- Optional fields (for future updates):
  - Tags (e.g., "React", "Node.js").
  - Screenshots of the project.

