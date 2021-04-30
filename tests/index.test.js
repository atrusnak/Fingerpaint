describe('Fingerpaint', () => {
    beforeAll(async () => {
      await page.goto('https://fingerpaint-7b504.web.app/index.html');
    });
  
    it('should be titled "Fingerpaint"', async () => {
      await expect(page.title()).resolves.toMatch('Fingerpaint');
    });

    it('on login should go to home', async ()=>{
      await page.type('#inputEmail','muhd.adam1@gmail.com');
      await page.type('#inputPassword','newpassword');
      await page.click('button', { text: 'Sign in' });
      await page.waitForNavigation();
      await expect(page.title()).resolves.toMatch('Home');
    });

    
  });