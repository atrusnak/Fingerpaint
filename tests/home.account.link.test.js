const { TestScheduler } = require("@jest/core");
const { AlwaysDepth } = require("three");

describe('Fingerpaint', () => {
   
    beforeAll(async() =>{
        await page.goto('http://localhost:5002/index.html');
        await page.type('#inputEmail','sjwagner5@wisc.edu');
        await page.type('#inputPassword','1234567');
        await page.click('button', { text: 'Sign in' });
        await page.waitForNavigation();
    });

     it('should go to account page', async()=>{
        try{
            
            await page.evaluate(() => {
                document.querySelector('.anchorButton').click();
            });
            
            await page.waitForNavigation();
            
            await expect(page.title()).resolves.toMatch('Account View');
        } catch(error) {
            console.log(error);
            throw new Error('did not go to account page');
        }
    });

    afterAll(async() =>{
        page.close();
    });
});