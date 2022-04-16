# doingud-hackathon

Submission for the DoinGud mini-hackathon.

## Project - **NFT Review**

The project is called **NFT Review** and allows users to rate and review NFTs using DIDs and the Ceramic Network.

A live demo is deployed to https://doingud-hackathon.vercel.app

### Tech stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Self.ID Framework](https://developers.ceramic.network/tools/self-id/framework/)
- [Glaze Suite](https://developers.ceramic.network/reference/glaze/)
- [Chakra UI](https://chakra-ui.com/)
- [react-query](https://react-query.tanstack.com/)
- [The Graph](https://thegraph.com/en/)

### TODOs

A bunch of things can of course be improved and some things were left out of the scope for this mini-hackathon.

#### Features

- Support for multiple DID auth providers
  - Currently only Ethereum and MetaMask are supported
- Support for multiple NFTs
  - Currently only BAYC NFTs are supported. Ideally this should be dynamic and allow for any NFT that has a deployed subgraph.
- Search, filter and sort functionality
- Aggregated reviews and ratings indices
  - Allow reviews and ratings of multiple DIDs to be aggregated and indexed.
- Up- and downvote reviews of other users
- Comment system on reviews

#### Technical

- Proper CI/CD pipeline
  - Current deployment happens on every merge to `main`. At least another environment beside `production` should also be targeted at some point.
  - GitHub Action workflows for linting and testing are missing.
  - Automated releases based on conventional commits
- Proper tests
  - In the true spirit of a hackathon, most of the existing code was manually tested.
  - At least some unit tests for hooks should be added.
  - Ideally also some cypress or playwright tests.

## Dev env setup

### 1. Clone this repository

```sh
git clone https://github.com/dohaki/doingud-hackathon.git
```

### 2. Install deps

```sh
cd doingud-hackathon

npm install
```

### 3. Publish the data model

This application uses a custom [data model](https://developers.ceramic.network/tools/glaze/datamodel/) created by the [`create-model` script](./scripts/create-model.mjs). This model needs to be published to the Ceramic node before running the app.

```sh
npm run publish-model
```

### 4. Start the development server

```sh
npm run dev
```

## Scripts

Use `npm run` or `yarn run` with one of the following scripts:

### `dev`

Compile and run a development server.

### `build`

Compile for production.

### `lint`

Lint the source code.

### `start`

Run a local server for production build.

### `publish-model`

Run the [`publish-model` script](./scripts/publish-model.mjs).

### `create-model`

Run the [`create-model` script](./scripts/create-model.mjs).

This is only needed to make changes to the model used by the app.
A hex-encoded 32-byte `SEED` environment variable must be present to create a key DID for the model when running the script.
