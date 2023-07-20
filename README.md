# The Homebrew Bar

## Project scope
- For the developer: This project will incrementally introduce new features in order to test and build skills in the React ecosystem, as well as different development patterns etc.

- For the user: This project is aimed towards beginners in the cocktails/mixology business. By looking for recipes by name or asking for a random one, it's possible to learn something new and get inspired.
The user can save any interesting recipe among the favorites and manage them.

## User flow
Users, especially the new ones, will visit the landing page where they can get a taste of the app's aesthetics and goal. A well-visible CTA on the main button will invite the user to try out the application.

The dashboard is made of 4 main components:
- The navbar, which persists among different views.
- View #1: Explore - where the users searches for cocktails either by entering the name in the input bar or by clicking on the "random" button. Each recipe card contains a button to show a modal with the full info and an "add/remove from favorites" button.
- View #2: Favorites - Here the user can review the recipes saved from the Explore view. The cards have the same functionality as in the Explore view. It's possible to clear all the favorites with a single click of a button.
- View #3: About - Act like some sort of footer and shows simple information about the developer, the stack used for this project, as well as a link to the GitHub repository for those who want to take a look at the code.

## Directory structure
-src
    -app
        -dashboard 

    -components
        -dashboard   -landing
            -views

    -lib

    -store

Explanation:
Names in the same indentation level are siblings, further indented name beneath them are subfolders

Like most Next.js project, the root folder contains configuration files and dependencies, as well as the builds.

The main src folder contains the whole project's code.

The app folder is required by Next.js, as it's the entry point for its own router. Inside of it we find the core assets as well as the routes for the project's pages. In this case, besides the landing page there's currently another one, known as the dashboard.

The components folder contains shared components as well as page-specific ones found in the respective subfolders. In particular, the dashboard subfolder contains a views subfolder which contains the code for each of the 3 views that comprise the dashboard experience

The lib folder contains function whose utility is shared among views and components

The store folder contains the main store file as well as the possible slices