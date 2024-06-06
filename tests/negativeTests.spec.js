const { test, expect } = require('@playwright/test');
const { pageUrl, locators, constants, setupTests } = require('./test-setup');

test.describe('Negative auto tests', () => {
    setupTests();

    test('verify no questions text appears after clicking "Remove questions" button with 0 questions created', async ({ page }) => {
        await page.click(locators.removeButton);
        await page.waitForSelector(locators.noQuestionsText);
        const noQuestionsText = await page.innerText(locators.noQuestionsText);
        expect(noQuestionsText).toBe('No questions yet :-(');
    });

    test('submit empty form and verify field is highlighted and no new question created', async ({ page }) => {
        const questionElementsInitialLength = (await page.$$(locators.existingQuestion)).length;
        await page.click(locators.createQuestionsButton);
        const questionElements = await page.$$(locators.existingQuestion);
        expect(questionElements.length).toBe(questionElementsInitialLength);
    });

    test('submit form with only question filled and verify "answer" field is highlighted and no new question created', async ({ page }) => {
        const questionElementsInitialLength = (await page.$$(locators.existingQuestion)).length;
        await page.fill(locators.newQuestionField, constants.newQuestionText);
        await page.click(locators.createQuestionsButton);
        const questionElements = await page.$$(locators.existingQuestion);
        expect(questionElements.length).toBe(questionElementsInitialLength);
    });

    test('submit form with only answer filled and verify "question" field is highlighted and no new question created', async ({ page }) => {
        const questionElementsInitialLength = (await page.$$(locators.existingQuestion)).length;
        await page.fill(locators.newAnswerField, constants.newAnswerText);
        await page.click(locators.createQuestionsButton);
        const questionElements = await page.$$(locators.existingQuestion);
        expect(questionElements.length).toBe(questionElementsInitialLength);
    });
});
