describe('404', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:5002/asdfasdfsdf');
    });
  
    it('should be titled "Page Not Found"', async () => {
      await expect(page.title()).resolves.toMatch('Page Not Found');
    });

    afterAll(() => { 
     page.close();
    });
  });