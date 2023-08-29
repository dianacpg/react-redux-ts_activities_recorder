# Activities Recorder

## Description

The Activities Recorder app lets you easily track your activities in real time using a stopwatch. It also has a calendar that shows all your recorded activities by day, along with their start and end times. You can edit or delete recorded activities whenever you need to.

[**Live Demo 🚀**](https://task-recorder-axhs.onrender.com/)

**Key Features:**

- Record start and end dates from an activity.
- Update activity name.
- Delete activity.
- Check activities in Calendar

## Table of contents

- [Technology](#technology)
- [Setup](#setup)

## Technology

- React (create-react-app);
- Typescript;
- SCSS;
- ESLint;
- Prettier;
- Jest;
- react-testing-library;
- Mock Service Worker;

## Setup

### Frontend

1. Clone the repository
   ```
   $ git clone https://github.com/dianacpg/react-redux-ts_activities_Stopwatch.git
   ```
2. Install packages
   ```
   $ npm i
   ```
3. Add env variable to connect with the API

```
REACT_APP_API_BASE_URL
```

4. Start app
   ```
   $ npm start
   ```

### API

1. This app is build with fake json-server deployed in Vercel. You will need to create a new repository and follow [json-server-vercel](https://github.com/kitloong/json-server-vercel) instructions.

- Database json should follow the following structure example:

```
{
  "events": [
    {
      "title": "event 1",
      "dateStart": "2023-07-17T15:48:02.499Z",
      "dateEnd": "2023-07-17T15:48:08.720Z",
      "id": 1
    },
  ]
}
```

2. In order to be able to POST, PUT and DELETE successfully in the fake api, you just need to add the following code top of the file `/api/server.js`.

```
const fs = require("fs")
const path = require("path")
const db = JSON.parse(fs.readFileSync(path.join("db.json")))
```

- And update router to use the `db`

```
const router = jsonServer.router(db)
```

3. After deploying to vercel add api url to `REACT_APP_API` env variable
