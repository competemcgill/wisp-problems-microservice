# Welcome to the WISP Problems Microservice Documentation

This project is developed by [Competitive Programming McGill](https://compete-mcgill.ca).

WISP is a project aimed at creating a fluid and fun experience for members of Compete McGill to learn competitive programming.

Among other functionality, WISP hosts an evolving set of problems and problem sets for users to attempt, and tracks their progress. The purpose of this microservice is to manage all data and logic relating to these problems and problem sets.

## Project layout

    src/    # Contains all source code
        config/
        controllers/
        database/
            interactions/
            models/
        interfaces/
        routes/
        util/
        validators/
        app.ts
        server.ts
    docs/
        index.md  # This documentation page.
        ...       # Other markdown pages, images and other files.
    Dockerfile          
    docker-compose.yaml
    mkdocs.yml    # Configuration for these docs
    LICENSE
    nodemon.json
    package.json
    package-lock.json
    swaggerDoc.js
    tsconfig.json
    tslint.json