# Promptify
Promptify is a fullstack CRUD application that allows users to create, share, and discover creative AI prompts.
Application is running on Next.js 14 and uses MongoDB as a database to store users and their posts.
This project is deployed on Vercel https://paradizeya-promptify.vercel.app/.

## Features
- **Authentication with [NextAuth.js](https://next-auth.js.org/)**. Users can sign in using Google. The Discord provider is used for local testing as it is much faster to set up than Google. Credentials are a backup option for logging into the system for testing.
- **CRUD functionality**. Authorized users can create prompts that can be edited or deleted later on their profile page.
- **User profile**. Each user has a profile page where all of their posts can be found. You can access a user's profile by clicking on their avatar at the home page. Only on this page can user see the Edit and Delete buttons if this is their profile.
- **Search functionality**. The home page has a search bar where you can search by usernames, prompt text, and tags. Additionally, you can click on any tag on this page to sort posts by that tag only.
- **Copy prompt to clipboard**. Each post has a button to copy prompt text with a single click.
- **A responsive design**. Styled with SCSS this application is fully responsive and looks great on any device.

## Installation
1. Clone this repository to your local machine:
```bash
git clone https://github.com/paradizeya/promptify.git
```
2. Install the required dependencies by going to the project directory and running this command:
```bash
npm install
```
3. Create an ```.env.local``` file in the root directory of the project and add the following environment variables (change their value):
```bash
GOOGLE_CLIENT_ID="set up your Google authentication and get Client ID"
GOOGLE_CLIENT_SECRET="set up your Google authentication and get Client Secret"

DISCORD_CLIENT_ID="set up your Discord authentication and get Client ID"
DISCORD_CLIENT_SECRET="set up your Discord authentication and get Client Secret"

MONGODB_URI="get your db connection URL"

NEXTAUTH_SECRET="any secret string"
NEXTAUTH_URL="http://localhost:3000 or your host's base URL"
NEXT_PUBLIC_BASE_URL="http://localhost:3000 or your host's base URL"
```

## API Endpoints
This are the available API endpoints:

- **[GET]** ```/api/user/{id}``` — get single user;
- **[GET]** ```/api/user/{id}/posts``` — get all posts of the user.

- **[GET]** ```/api/prompts``` — get all prompts;
- **[POST]** ```/api/prompt/new``` — create new prompt;
- **[GET]** ```/api/prompt/{id}``` — get single prompt;
- **[PATCH]** ```/api/prompt/{id}``` — Update prompt;
- **[DELETE]** ```/api/prompt/{id}``` — delete prompt.

You can call this API endpoints directly, however there are ```get``` functions in an ```app/services``` directory for first three API requests.
