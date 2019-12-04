const express = require('express');
const router = express.Router();

// We need to update the path since all of the code will be set in index.js in the root folder
const Hubs = require('./hubs-model.js');

router.use(express.json());

// the path already has /api/hubs already, so we only need to add the additional url fragment that will be added

// This is /api/hubs/
router.get('/', (req, res) => {
  Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
});

// this is /api/hubs/:id
router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({message: 'Hub not found'});
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
});

router.post('/', (req, res) => {
  Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
});

router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'The hub has been nuked'});
      } else {
        res.status(404).json({message: 'The hub could not be found'});
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({message: 'The hub could not be found'});
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
});

// add an endpoint that returns all the messages for a hub
// GET /api/hubs/:id/messages
router.get('/:id/messages', (req, res) => {
  Hubs.findHubMessages(req.params.id)
    .then(messages => {
        if (messages.length === 0) {
          res.status(404).json({message: 'No messages are found for this post.'});
        } else {
          res.status(200).json(messages);
        }
      }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({errorMessage: 'Error getting hub messages'})
    })
});

// add an endpoint for adding new message to a hub
router.post('/:id/messages', (req, res) => {
  Hubs.addMessage(req.body)
    .then(messages => {
      res.status(201).json(messages);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the message...',
      });
    })
});

module.exports = router;