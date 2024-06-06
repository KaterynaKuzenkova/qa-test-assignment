const { test, expect } = require('@playwright/test');
const { pageUrl, locators, constants, setupWithCleanup } = require('./test-setup');

test.describe('Question Creation and Management Tests', () => {
    setupWithCleanup();

    test('verify if new question and answer is created', async ({ page }) => {
        await page.fill(locators.newQuestionField, constants.newQuestionText);
        await page.fill(locators.newAnswerField, constants.newAnswerText);
        await page.click(locators.createQuestionsButton);
        const newQuestion = await page.locator(locators.newQuestionSelector, { hasText: constants.newQuestionText });
        await expect(newQuestion).toBeVisible();
        await newQuestion.click();
        const newAnswer = await page.locator(locators.newAnswerSelector, { hasText: constants.newAnswerText });
        await expect(newAnswer).toBeVisible();
    });

    test('verify if questions are sorted alphabetically after sort button is clicked', async ({ page }) => {
        for (let i = 0; i < constants.randomLetters.length; i++) {
            const questionText = constants.randomLetters[i] + ' ' + constants.newQuestionText;
            await page.fill(locators.newQuestionField, questionText);
            await page.fill(locators.newAnswerField, `${constants.newAnswerText} ${i + 1}`);
            await page.click(locators.createQuestionsButton);
        }

        await page.click(locators.sortButton);
        const questionElements = await page.$$(locators.existingQuestion);
        const questionTexts = [];
        for (const questionElement of questionElements) {
            const questionText = await questionElement.innerText();
            questionTexts.push(questionText);
        }
        const sortedQuestionTexts = [...questionTexts].sort();
        expect(questionTexts).toEqual(sortedQuestionTexts);
    });

    test('verify if text with number of questions is correct', async ({ page }) => {
        for (let i = 0; i < 4; i++) {
            await page.fill(locators.newQuestionField, `${constants.newQuestionText} ${i + 1}`);
            await page.fill(locators.newAnswerField, `${constants.newAnswerText} ${i + 1}`);
            await page.click(locators.createQuestionsButton);
        }
        const questionCountText = await page.innerText('.sidebar');
        const numberOfQuestionsText = questionCountText.match(/\d+/)[0];
        const numberOfQuestions = parseInt(numberOfQuestionsText);
        const questionElements = await page.$$(locators.existingQuestion);
        expect(questionElements.length).toBe(numberOfQuestions);
    });
});
