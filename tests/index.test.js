describe('Fingerpaint', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:5002/index.html');
    });
  
    it('should be titled "Fingerpaint"', async () => {
      await expect(page.title()).resolves.toMatch('Fingerpaint');
    });

    it('on login should go to home', async ()=>{
      await page.type('#inputEmail','muhd.adam1@gmail.com');
      await page.type('#inputPassword','newpassword');
      await page.click('button', { text: 'Sign in' });
      await page.waitForNavigation();
      await expect(page.title()).resolves.toMatch('Home View');
    },10000);

    afterAll(() => { 
       page.close();
    });
  });