describe('Fingerpaint', () => {
    beforeAll(async () => {
      await page.goto('https://fingerpaint-7b504.web.app/index.html');
    });
  
    it('should be titled "Fingerpaint"', async () => {
      await expect(page.title()).resolves.toMatch('Fingerpaint');
    });
  });