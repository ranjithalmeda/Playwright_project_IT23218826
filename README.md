IT23218826 - WE - 2.2 - Y3S2

# Tamil Converter — Playwright tests

A Playwright automation suite for testing the Tamil Converter (https://tamil.changathi.com/).

These tests verify how the site converts Thanglish (latin-letter Tamil) into Tamil script and check for any unexpected behaviour or failures.

What’s inside

- Positive functional tests (short, medium, long inputs)
- Negative tests (typos, mixed language, symbols, numbers)
- A UI test that checks real-time conversion while typing

---

## Quick status (run on 2026-01-30)

- Total tests executed: 144
- Passed: 136
- Failed: 8 (details below)

Failures worth noting:
- Pos_Fun_0018 (longer mixed) — test timed out and the browser/page closed during the run (site instability on this long input).
- Neg_Fun_0009 (very long invalid) — same timeout/page-closed issue for long invalid input.
- Several negative tests unexpectedly produced Tamil output (meaning the app converted inputs we expected it not to):
  - Neg_Fun_0001, Neg_Fun_0002, Neg_Fun_0003, Neg_Fun_0004, Neg_Fun_0005, Neg_Fun_0007, Neg_Fun_0010

These failures reflect the live site behaviour (not the test harness). I left the long-input tests enabled so the test run records the real behavior for your assignment.

---

## Quick setup

1. Node (v14+) and npm installed
2. In the repo root:

```bash
npm install
npx playwright install
```

## Run the tests

- All tests: npm test
- Only the Tamil converter file: npx playwright test tests/tamil-converter.spec.js --workers=1
- Run a single test by id or name (example):

```bash
npx playwright test -g "Pos_Fun_0018" --workers=1
```

- Use headed mode for debugging: add `--headed --project=chromium` or run `npm run test:headed` (if configured)

## What the tests produce

- A CSV with results: `test-results/tamil-converter-results.csv`
  - Columns: TC ID, Test Name, Input Length (S/M/L), Input, Expected, Actual Output, Status, Notes
  - Use this CSV to paste into your assignment sheet. I recommend adding two manual columns in your Excel sheet: **Accuracy justification** and **What is covered by the test**. Fill those in with the notes from this CSV and a short rationale (e.g., "Failed — site converted mixed English input unexpectedly").

## How tests work

- Tests use the textarea selector `#transliterateTextarea` where converted Tamil appears
- Short inputs are typed to simulate real user interaction; long inputs use `fill()` with event dispatch for reliability
- Long inputs include a keystroke workaround (Space → Backspace → Space) to trigger conversion
- Tamil detection uses Unicode range check (/[\u0B80-\u0BFF]/)

## Known Issues

- The site times out or closes the browser for very long inputs (seen in `Pos_Fun_0018` and `Neg_Fun_0009`). These tests are kept active to capture the real site behavior in results.
- Some negative tests unexpectedly produced Tamil output, indicating the site's input handling is too permissive for certain invalid inputs.
- Single-worker mode and wait/fallback logic were used to reduce test flakiness.

## Troubleshooting

- Tests time out: try increasing per-test timeout in `playwright.config.js` or re-run the failing test alone.
- Selector changed: update `#transliterateTextarea` in `tests/tamil-converter.spec.js`.
- If browser crashes for long input, try running the specific failing test in headed mode to observe browser behavior.

---

## If you want to improve the tests further

- Document known issues like `Pos_Fun_0018` and `Neg_Fun_0009` (site instability with long inputs)
- Mark failing tests with `test.fixme()` if needed for CI tracking
## Test Coverage

### Functional Test Categories

1. **Sentence Structures**
   - Simple sentences
   - Compound sentences
   - Complex sentences

2. **Grammar Forms**
   - Interrogative (questions)
   - Imperative (commands)
   - Positive and negative forms
   - Tense variations (past, present, future)
   - Pronoun variations (singular/plural)

3. **Daily Language Usage**
   - Common greetings and requests
   - Polite vs informal phrasing
   - Multi-word expressions and phrases

4. **Input Variations**
   - Short inputs (≤30 characters)
   - Medium inputs (31-299 characters)
   - Long inputs (≥300 characters)
   - Punctuation and numbers
   - Special characters

5. **Robustness Testing**
   - Joined words without spaces
   - Typos and invalid characters
   - Mixed language content
   - Incomplete words

### UI Test Coverage

- Real-time output updates while typing
- Input field responsiveness
- Output field visibility and updates

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd assignment_01_ITPM_playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (if not already installed)
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run only Tamil converter tests
```bash
npm run test:tamil
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## Test Results

Test results are automatically saved to:
```
test-results/tamil-converter-results.csv
```

The CSV file contains:
- TC ID: Test case identifier
- Test Name: Description of the test
- Input Length: S (short), M (medium), or L (long)
- Input: The Thanglish input text
- Expected Output: Expected Tamil output
- Actual Output: Actual output from the application
- Status: Pass or Fail
- Notes: Additional details about the test result

## Test Case Naming Convention

- **Pos_Fun_XXXX**: Positive functional test cases
- **Neg_Fun_XXXX**: Negative functional test cases
- **Pos_UI_XXXX**: Positive UI test cases
- **Neg_UI_XXXX**: Negative UI test cases

## Input Format

The Tamil Converter uses Thanglish (Tamil transliteration) format. Examples:

| Thanglish | Tamil |
|-----------|-------|
| vanakkam | வணக்கம் |
| naan veetukuporen | நான் வீட்டுக்குப்போறேன் |
| eppadi irukkinga? | எப்படி இருக்கிங்க? |
| naan sapidaren | நான் சாப்பிடறேன் |

**Important**: Always include a space at the end of the input to trigger the conversion.

## Project Structure

```
assignment_01_ITPM_playwright/
├── tests/
│   ├── tamil-converter.spec.js      # Main test file
│   └── tests/
│       └── sinhalaDomCheck.spec.js  # Other tests
├── test-results/
│   └── tamil-converter-results.csv  # Test execution results
├── playwright-report/               # HTML test report
├── playwright.config.js             # Playwright configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Configuration

The Playwright configuration is defined in `playwright.config.js`:

- **Test Directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit
- **Reporter**: HTML report
- **Trace**: Enabled on first retry
- **Headless Mode**: Disabled by default for visibility

## Troubleshooting

### Tests fail to run
- Ensure all dependencies are installed: `npm install`
- Ensure Playwright browsers are installed: `npx playwright install`

### Tests timeout
- The application may be slow to respond
- Increase timeout in playwright.config.js if needed
- Check internet connection

### Output not captured correctly
- The selectors for input/output fields may have changed
- Inspect the application HTML and update selectors in the test file
- Use `npm run test:debug` to debug selector issues

### Browser not opening
- Ensure you're using `npm run test:headed` to see the browser
- Check if port 3000 or other required ports are available

## Notes

- Tests are designed to work with the live Tamil Converter application
- Real-time conversion is triggered by typing a space after the input
- The application may have rate limiting; tests include appropriate waits
- Some edge cases may not be handled by the application as expected

## Support

For issues or questions about the test suite, refer to:
- Playwright Documentation: https://playwright.dev/
- Tamil Converter: https://tamil.changathi.com/

## License

This project is part of the IT3040 - ITPM assignment.
