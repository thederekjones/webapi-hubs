const express = require('express');

const db = require('./data/db.js');

const server = express();
const port = '9090';

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/now', (req, res) => {
  const now = new Date().toString();
  res.send(now);
});

server.get('/api/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(({ code, message }) => {
      res.status(code).json(message);
    });
});

server.post('/api/hubs', (req, res) => {
  // get data off req.body
  const newHub = req.body;

  //insert in db
  db.hubs
    .add(newHub)
    .then(dbHub => {
      res.status(201).json(dbHub);
    })
    .catch(({ code, message }) => {
      res.status(code).json(message);
    });
});

server.delete('/api/hubs:id', (req, res) => {
  const { id } = req.params;

  db.hubs
    .remove(id)
    .then(hub => {
      if (hub) {
        res.json(hub);
      } else {
        res.status(400).json({ err: 'invalid id' });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.put('/api/hubs/:id', (req, res) => {
  const { id } = req.params;
  const updatedHub = req.body;

  db.hubs
    .update(id, updatedHub)
    .then(dbHub => {
      if (dbHub) {
        res.json(hub);
      } else {
        res.status(400).json({ err: 'invalid id' });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.get('/api/hubs/:id', (req, res) => {
  const { id } = req.params;

  db.hubs
    .findById(id)
    .then(hub => {
      if (hub) {
        res.json(hub);
      } else {
        res.status(400).json({ err: 'invalid id' });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message });
    });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
