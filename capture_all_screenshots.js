const { chromium } = require('C:/Users/User/AppData/Roaming/npm/node_modules/n8n/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureAll() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('1. Capturing Landing Page...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_landing_hero.png') });

  console.log('2. Capturing Analyzer Idle Workspace...');
  await page.goto('http://localhost:5173/app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_analyzer_workspace.png') });

  console.log('3. Running Analysis & Capturing Token Stream...');
  // Click Run Analysis button
  await page.click('button:has-text("Run Analysis")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_analyzer_token_stream.png') });

  console.log('4. Selecting a Token to inspect DFA State Trace...');
  // Click on the second row (the identifier 'total')
  const totalRow = page.locator('.token-table-row:has-text("total")');
  if (await totalRow.count() > 0) {
    await totalRow.first().click();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_analyzer_dfa_trace.png') });

  console.log('5. Capturing Lexical Error Detection...');
  // Type invalid input into textarea
  const textarea = page.locator('textarea.editor-textarea');
  await textarea.fill('let 99invalid = "bad";\n@illegal_symbol;');
  await page.click('button:has-text("Run Analysis")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_analyzer_error_detection.png') });

  console.log('6. Capturing Automata Overview Hub...');
  await page.goto('http://localhost:5173/automata', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_automata_overview.png') });

  console.log('7. Capturing NFA Diagram & Definition...');
  await page.goto('http://localhost:5173/automata/nfa', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_nfa_formal_diagram.png') });

  console.log('8. Capturing DFA Diagram & Subset Construction...');
  await page.goto('http://localhost:5173/automata/dfa', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_dfa_diagram_subset.png') });

  console.log('9. Capturing Minimized DFA Diagram & Equivalence...');
  await page.goto('http://localhost:5173/automata/minimized', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_minimized_dfa_diagram.png') });

  console.log('10. Capturing Automata Transition Tables...');
  await page.goto('http://localhost:5173/automata/tables', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_transition_tables.png') });

  console.log('11. Capturing System Design & Architecture Pipeline...');
  await page.goto('http://localhost:5173/docs/system-design', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_system_architecture.png') });

  console.log('12. Capturing Automated Test Suite (20 Test Cases)...');
  await page.goto('http://localhost:5173/tests', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // allow tests to execute and display
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_test_suite_all_passed.png') });

  console.log('13. Capturing Token Reference & Lexical Grammar...');
  await page.goto('http://localhost:5173/docs/token-reference', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13_token_reference_grammar.png') });

  console.log('14. Capturing About & Team Matrix Page...');
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14_about_and_team.png') });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureAll().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
