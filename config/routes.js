const WordService = require('../services/words.service');

module.exports.configureRoutes = (middleware) => {
  wordRoutes(middleware);
};

function wordRoutes(middleware) {
  middleware.get('/words', WordService.handleReadingWords);
  middleware.post('/words', WordService.handleCreatingWords);
}