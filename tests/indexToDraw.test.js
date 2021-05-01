
    beforeAll(async () => {
        //let page = await browser.newPage();
        await page.goto('http://localhost:5002/index.html');
    });
afterAll(() => { 
page.close()
});
describe('IndexToDraw', () => {

    it.only('should navigate to draw on click of draw"', async () => {
      await page.click('#drawbtn');
      await expect(page.title()).resolves.toMatch('Draw');
    },30000);


  });