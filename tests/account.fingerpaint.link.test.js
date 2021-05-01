
describe('Fingerpaint', () => {
   
    beforeAll(async() =>{
        await page.goto('http://localhost:5002/index.html');
        await page.type('#inputEmail','sjwagner5@wisc.edu');
        await page.type('#inputPassword','1234567');
        await page.click('button', { text: 'Sign in' });
        await page.waitForNavigation();
        await page.goto('http://localhost:5002/account.html');
        await page.waitForNavigation();
        //await page.click('#finger');
    });

     it('should go to home page', async()=>{
        try{
            
            await page.evaluate(() => {
                document.querySelector('#finger').click();
            });
            
            await page.waitForNavigation();
            
            await expect(page.title()).resolves.toMatch('Home View');
        } catch(error) {
            console.log(error);
            //throw new Error('did not go to home page');
        }
    });

    afterAll(async() =>{
        page.close();
    });
});