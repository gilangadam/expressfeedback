const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();

await page.goto('https://expressfeedback.vercel.app/login');
await page.type('#email', 'checkly@expressfeedback.com');
await page.type('#password', 'checkly');
await page.screenshot({ path: 'login.png' });

await page.waitForSelector('#login');
await page.click('#login');

await page.waitForSelector('#add-site-modal-button');
await page.click('#add-site-modal-button');

await page.waitForSelector('#site-input');
await page.click('#site-input');
await page.type('#site-input', 'Checkly');

await page.waitForSelector('#link-input');
await page.click('#link-input');
await page.type('#link-input', 'https://checklyhq.com/');

await page.screenshot({ path: 'add-site.png' });

await page.waitForSelector('#create-site-button');
await page.click('#create-site-button');

await page.waitForSelector(
  'body > #react-toast > .Toaster__manager-bottom > .Toaster__message > .Toaster__message-wrapper'
);
await page.click(
  'body > #react-toast > .Toaster__manager-bottom > .Toaster__message > .Toaster__message-wrapper'
);
await page.screenshot({ path: 'toast-create-site.png' });

await page.waitForSelector('#site-table-link-0');
await page.click('#site-table-link-0');
await page.screenshot({ path: 'site-table.png' });

await navigationPromise;

await page.waitForSelector('#comment');
await page.click('#comment');
await page.type('#comment', 'Testing via Checkly');

await page.screenshot({ path: 'add-feedback.png' });

await page.waitForSelector('#submit-feedback');
await page.click('#submit-feedback');

await page.waitForSelector('#feedback-link');
await page.click('#feedback-link');

//toggle visibility
await page.waitForSelector(
  '.css-0 > .css-vfexqm > .css-v7ibj3 > .css-1qa2oqy > .css-1fh8wk'
);
await page.click(
  '.css-0 > .css-vfexqm > .css-v7ibj3 > .css-1qa2oqy > .css-1fh8wk'
);

await page.waitForSelector('#sites-link');
await page.click('#sites-link');

await page.waitForSelector('#site-table-link-0');
await page.click('#site-table-link-0');

await navigationPromise;

//wait for the feedback that already set to visible
await page.waitForSelector(
  '#__next > .css-t2zytl > .css-r9039e > .css-p0snat > .css-1ryuo8q'
);
await page.click(
  '#__next > .css-t2zytl > .css-r9039e > .css-p0snat > .css-1ryuo8q'
);

await page.waitForSelector('#feedback-link');
await page.click('#feedback-link');

await navigationPromise;
await page.screenshot({ path: 'feedback-before-delete.png' });

//delete feedback icon button
await page.waitForSelector(
  '.css-0 > .css-1hs06cs > .css-1im46kq > g > path:nth-child(1)'
);
await page.click(
  '.css-0 > .css-1hs06cs > .css-1im46kq > g > path:nth-child(1)'
);

//alert dialog confirm delete
await page.waitForSelector(
  '.css-1a29t1v > .css-19ewlhq > #alert-dialog-5 > .css-81g6me > .css-12bu10h'
);
await page.click(
  '.css-1a29t1v > .css-19ewlhq > #alert-dialog-5 > .css-81g6me > .css-12bu10h'
);

await navigationPromise;
await page.screenshot({ path: 'feedback-after-delete.png' });

await page.waitForSelector('#sites-link');
await page.click('#sites-link');

await navigationPromise;
await page.screenshot({ path: 'site-before-delete.png' });

await page.waitForSelector('#delete-site-button-icon-0');
await page.click('#delete-site-button-icon-0');

await page.waitForSelector('#delete-site-button-confirm-0');
await page.click('#delete-site-button-confirm-0');

await navigationPromise;
await page.screenshot({ path: 'site-after-delete.png' });

await page.waitForSelector('#user-link');
await page.click('#user-link');

await navigationPromise;
await page.screenshot({ path: 'account.png' });

await page.waitForSelector('#log-out-button');
await page.click('#log-out-button');

await navigationPromise;
await page.screenshot({ path: 'log-out-success.png' });

await browser.close();
