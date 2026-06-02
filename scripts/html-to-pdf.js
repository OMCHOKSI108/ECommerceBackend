const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async function(){
  try {
    const htmlPath = path.resolve(__dirname, '../docs/Interview_QA.html');
    const pdfPath = path.resolve(__dirname, '../docs/Interview_QA.pdf');

    if (!fs.existsSync(htmlPath)) {
      console.error('HTML file not found:', htmlPath);
      process.exit(2);
    }

    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }});
    await browser.close();
    console.log('PDF written to', pdfPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
