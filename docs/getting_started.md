# Getting Started

## For Development

### Requirements
* [`docker`](https://www.docker.com/)
* [`docker-compose`](https://docs.docker.com/compose/)

### Running

Clone the repository, and navigate to the root of the project.

Then run:

```bash
npm start
```

## For Production

### Requirements
* [`docker`](https://www.docker.com/)

### Build

Clone the repository, and navigate to the root of the project.

Then run:

```bash
docker build -t wisp-problems-microservice:latest
```
```bash
docker run --rm -d -p 3000:3000 wisp-problems-microservice
```
