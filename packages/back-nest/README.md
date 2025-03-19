## Setting up environment variables
For local development, you will have to set these variables in the `.env` file in the `./packages/back-nest/` directory, that you have copied (Refer to: [Contributing](../../CONTRIBUTING.md), Backend)

### General
- `APP_PORT`: The port the backend will listen on, just use 1337
- `GITHUB_ACCESS_TOKEN`: Used to access the open source projects that are used for the challenges. Refer to this [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic), and when you get asked about scopes, select none and create it.
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: These are required for OAuth integration with GitHub. Without these, GitHub OAuth won't work. [Here](https://github.com/settings/applications/new) you can add a new application. For the callback url, set it to `http://localhost:1337/api/auth/github/callback`. If you are running the app on a different port, set it to that port.
- `SESSION_SECRET`: Used for encrypting session cookies. This should be a unique and secret string to ensure the security of session data. To generate a random secret you could use this [site](https://www.browserling.com/tools/random-hex). *It should be at least be 32 characters long!*

### Database Configuration
The following environment variables are used to configure the connection to your PostgreSQL database. These should be defined in your `.env` file as well:

- `DB_USERNAME`: The username for connecting to your PostgreSQL database.
- `DB_PASSWORD`: The password associated with the database user.
- `DB_HOST`: The host address where your PostgreSQL instance is running. For local development, this will typically be `localhost`.
- `DB_PORT`: The port on which your PostgreSQL instance is running. By default, PostgreSQL uses `5432`.
- `DB_NAME`: The name of the database that the application should connect to. Just stick to `speedtyper` if you don't know what you are doing.

## Seed challenge data

This requires you to have a GitHub access token, as seen above.

### Seed test challenges
```
yarn command seed-challenges
```

### Seed production challenges
```
yarn command import-projects
yarn command import-files
yarn command import-challenges
yarn command sync-projects
```
