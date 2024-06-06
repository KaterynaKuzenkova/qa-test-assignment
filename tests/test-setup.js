// tests/test-setup.js
const { test, expect } = require('@playwright/test');
const { locators, constants } = require('./test-data/test-data');
const pageUrl = 'http://localhost:8000';

test.describe.configure({ mode: 'parallel' });

module.exports = {
    pageUrl,
    locators,
    constants,
    setupTests: () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(pageUrl);
        });
    },

    setupWithCleanup: () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(pageUrl);
        });

        test.afterEach(async ({ page }) => {
            await page.click(locators.removeButton);
            const questionElements = await page.$$(locators.existingQuestion);
            expect(questionElements.length).toBe(0);
            const noQuestionsText = await page.innerText('body');
            expect(noQuestionsText).toContain('No questions yet :-(');
        });
    },

    verifyButton: async (page, buttonLocator, expectedText, expectedColor) => {
        const button = await page.$(buttonLocator);
        const buttonText = await button.innerText();
        expect(buttonText).toBe(expectedText);
        const buttonColor = await button.evaluate(button => getComputedStyle(button).getPropertyValue('background-color'));
        expect(buttonColor).toBe(expectedColor);
    },

    verifyHoverText: async (page, textLocator, expectedText) => {
        await page.hover(textLocator);
        await page.waitForSelector('body', { text: expectedText });
        const newText = await page.innerText('body');
        expect(newText).toContain(expectedText);
    }
};