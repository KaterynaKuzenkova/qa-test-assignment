const { test, expect } = require('@playwright/test');
const { pageUrl, locators, setupTests, verifyButton } = require('./test-setup');

test.describe('Button Color and Text Test', () => {
    setupTests();

    test('verify that "Create question" button has correct color and text', async ({ page }) => {
        await verifyButton(page, locators.createQuestionsButton, 'Create question', 'rgb(92, 184, 92)');
    });

    test('verify that "Sort questions" button has correct color and text', async ({ page }) => {
        await verifyButton(page, locators.sortButton, 'Sort questions', 'rgb(2, 117, 216)');
    });

    test('verify that "Remove questions" button has correct color and text', async ({ page }) => {
        await verifyButton(page, locators.removeButton, 'Remove questions', 'rgb(217, 83, 79)');
    });
});
