import { ConfitAppPage } from './app.po';

describe('confit-app App', () => {
  let page: ConfitAppPage;

  beforeEach(() => {
    page = new ConfitAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
