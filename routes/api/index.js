const router = require('express').Router();

const routes = ['users', 'stories', 'posts', 'tags', 'genres'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
