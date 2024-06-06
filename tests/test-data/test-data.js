// tests/test-data.js

const constants = {
    randomLetters: ['A', 'B', 'C'],
    initialQuestionText: 'How to add a question?',
    newQuestionText: 'What is Playwright?',
    newAnswerText: 'Playwright is a testing framework.'
};

const locators = {
    pageTitle: 'header.header h1',
    existingQuestion: '.question__question',
    existingAnswer: '.question__answer',
    newQuestionField: '#question',
    newAnswerField: '#answer',
    createQuestionsButton: 'button.btn-success',
    sortButton: 'button.btn-primary',
    removeButton: 'button.btn-danger',
    newQuestionSelector: '.list-group-item .question__question',
    newAnswerSelector: '.list-group-item .question__answer',
    createdQuestionsText: '.tooltipped-title__title',
    noQuestionsText: '.alert.alert-danger'

};

module.exports = { constants, locators };
