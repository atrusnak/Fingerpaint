
 describe('Fingerpaint', () => {
   
    beforeAll(async() =>{
        await page.goto('http://localhost:5002/index.html');
        await page.type('#inputEmail','sjwagner5@wisc.edu');
        await page.type('#inputPassword','1234567');
        await page.click('button', { text: 'Sign in' });
        await page.waitForNavigation();
    });

    it('should go to draw page', async()=>{
        try{
            console.log(page.url());
            await page.evaluate(() => {
                document.querySelector('#plus').click();
            });
            
            await page.waitForNavigation();
            await expect(page.title()).resolves.toMatch('Draw');
        } catch(error){
            console.log(error);
            throw new Error('did not go to draw page');
        }
    });

    afterAll(async()=>{
        page.close();
    });
});