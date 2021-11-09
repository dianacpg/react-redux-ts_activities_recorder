# Activities Recorder

Small Dmytro Danylov course exercise to build an activities recorder using React, Redux and Typescript and a fake api server

## Features:

- [x] Timer to measure activities duration;
- [x] Organize activities by day;
- [x] Change activities names;
- [x] Delete activities;

## Build with:

- React (create-react-app);
- Typescript;
- CSS;
- Fake API server (json-server)

## Project architecture:

```
|-src/
  |-components/   - main components to be shared with each style
  | |-App/          - container component
  | |-Calendar/     - calendar component to display activities by day
  | |-Recorder/     - timer
  | |-redux/        - redux
  |-lib/          - utils
|-index.tsx       - entry file

```

## Setup:

#### To run this project:

```
$ git clone https://github.com/dianacpg/react-redux-ts_activities_recorder.git
$ cd your-project/
$ npm install
$ npm run dev


