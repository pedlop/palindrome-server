const Words = require('../models/word');
const ErrorHandler = require('../config/error');
const palindromeAttempt = require('./palindrome.service');

module.exports.handleReadingWords = async (request, response) => {
  try {
    const words = await Words.find();
    if (words) {
      const result = words.map(word => {
        delete word._doc.__v;
        return ({ ...word._doc, _id: word.id });
      });
      response.status(200).send(result);
    } else {
      return response.status(500).send(ErrorHandler.parseResponse({ name: 'Not Found', message: 'No words has been found.' }));
    }
  } catch (err) {
    response.status(500).send(ErrorHandler.parseResponse(err));
  }
};

module.exports.handleCreatingWords = async (request, response) => {
  const { first_word, second_word } = request.body;
  try {
    const wordsList = [];
    wordsList.push({
      word: first_word,
      is_palindrome: palindromeAttempt(first_word)
    });
    wordsList.push({
      word: second_word,
      is_palindrome: palindromeAttempt(second_word)
    });
    const words = new Words({ words: wordsList });
    const result = await words.save();
    if (result) {
      const message = wordsList.map(wrd => `A ${wrd.word.split(' ').length === 1 ? 'palavra' : 'frase'} '${wrd.word}' ${wrd.is_palindrome ? 'é' : 'não é'} um palíndromo.`).join(' ');
      response.send({ message });
    } else {
      return response.status(500).send(ErrorHandler.parseResponse({ name: 'Invalid Request', message: 'Erro inesperado.' }));
    }
  } catch (e) {
    return response.status(500).send(ErrorHandler.parseResponse(e));
  }
};