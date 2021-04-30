describe('Logout', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:5002/index.html');
    //jest.setTimeout(20000);
    await page.type('#inputEmail','muhd.adam1@gmail.com');
    await page.type('#inputPassword','newpassword');
    await page.click('button', { text: 'Sign in' });
    await page.waitForNavigation();
    await page.goto('http://localhost:5002/account.html');
    await page.waitForNavigation();
  });

  it('on logout title should be Fingerpaint', async ()=>{

     await page.waitForSelector('#logout');
     await page.click('#logout');
     await page.waitForNavigation();
     await expect(page.title()).resolves.toMatch('Fingerpaint');
  });
});