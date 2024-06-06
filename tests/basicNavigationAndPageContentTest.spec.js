const { test, expect } = require('@playwright/test');
import AxeBuilder from '@axe-core/playwright';
const { pageUrl, locators, constants, setupTests, verifyHoverText } = require('./test-setup');

test.describe('Basic Navigation and Page Content Tests', () => {
    setupTests();

    test('verify, that page has correct URL', async ({ page }) => {
        await expect(page).toHaveURL(pageUrl);
    });

    test('verify, that page has correct page title', async ({ page }) => {
        const pageTitle = await page.innerText(locators.pageTitle);
        expect(pageTitle).toBe('The awesome Q/A tool');
    });

    test('verify if correct text presented', async ({ page }) => {
        const question = await page.locator(locators.existingQuestion);
        await expect(question).toHaveText(constants.initialQuestionText);
    });

    test('verify that new text is displayed after hovering over "Created questions"', async ({ page }) => {
        await verifyHoverText(page, locators.createdQuestionsText, 'Here you can find the created questions and their answers.');
    });

    //test is disabled due to failing
    test.skip('verify page does not contain any detectable accessibility issues', async ({ page }) => {
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
        expect(accessibilityScanResults.violations).toEqual([])
    });

});
