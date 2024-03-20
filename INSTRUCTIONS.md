1. To create a route -> Create a folder.
   - For example, for the route "/new", create:
     `/new` --> `src/app/new/page.jsx`

2. Place all components in `src/components`.

3. If you want to use hooks in any component:
   - Write `use client` at the top of that file.
   - Try breaking down pages into smaller components that use hooks so that most of the page is rendered on the server.

4. Group related routes:
   - Routes like `src/app/(auth)/login` will be accessed by the route `/login`.
   - Folder names with "()" are invisible to the router; they are used for wrapping related routes.

Examples:
- Login page: `src/app/(auth)/login/page.jsx`
- Signup page: `src/app/(auth)/signup/page.jsx`
