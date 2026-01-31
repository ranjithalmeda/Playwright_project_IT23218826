const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// User-defined test inputs for Tamil converter
const testData = [
  // Positive test cases
  
  {
    tcId: 'Pos_Fun_0001',
    name: 'nalama test',
    length: 'S',
    input: 'nalama? ',
    shouldContainTamil: true,
    covered: ['Question', 'Greeting']
  },
  {
    tcId: 'Pos_Fun_0002',
    name: 'work going test',
    length: 'S',
    input: 'naan velaikupoga poren ',
    shouldContainTamil: true,
    covered: ['Daily activity', 'Statement']
  },
  {
    tcId: 'Pos_Fun_0003',
    name: 'playing test',
    length: 'S',
    input: 'naan vilayaduren ',
    shouldContainTamil: true,
    covered: ['Leisure', 'Action']
  },
  {
    tcId: 'Pos_Fun_0004',
    name: 'life going test',
    length: 'S',
    input: 'eppadi vaalkaiellam poguthu? ',
    shouldContainTamil: true,
    covered: ['Well-being', 'Question']
  },
  {
    tcId: 'Pos_Fun_0005',
    name: 'what work test',
    length: 'S',
    input: 'enna velayaa? ',
    shouldContainTamil: true,
    covered: ['Work inquiry', 'Question']
  },
  {
    tcId: 'Pos_Fun_0006',
    name: 'come command test',
    length: 'S',
    input: 'vaa daa? ',
    shouldContainTamil: true,
    covered: ['Invitation', 'Command']
  },
  {
    tcId: 'Pos_Fun_0007',
    name: 'wait test',
    length: 'S',
    input: 'thaanga ',
    shouldContainTamil: true,
    covered: ['Request', 'Direction']
  },
  {
    tcId: 'Pos_Fun_0008',
    name: 'work done test',
    length: 'S',
    input: 'naan velai sairen ',
    shouldContainTamil: true,
    covered: ['Completion', 'Past action']
  },
  {
    tcId: 'Pos_Fun_0009',
    name: 'work not done test',
    length: 'S',
    input: 'naan velai saiyamaten ',
    shouldContainTamil: true,
    covered: ['Negation', 'Past action']
  },
  {
    tcId: 'Pos_Fun_0010',
    name: 'played test',
    length: 'S',
    input: 'naan vilayaditen ',
    shouldContainTamil: true,
    covered: ['Past tense', 'Leisure']
  },
  {
    tcId: 'Pos_Fun_0011',
    name: 'playing ongoing test',
    length: 'S',
    input: 'naan vilayadikondu irrukiren ',
    shouldContainTamil: true,
    covered: ['Present continuous', 'Action']
  },
  {
    tcId: 'Pos_Fun_0012',
    name: 'play future test',
    length: 'S',
    input: 'naan vilayaduven ',
    shouldContainTamil: true,
    covered: ['Future tense', 'Leisure']
  },
  {
    tcId: 'Pos_Fun_0013',
    name: 'existence test',
    length: 'S',
    input: 'naan irruken ',
    shouldContainTamil: true,
    covered: ['Being/existence', 'State']
  },

  // Additional positive cases - longer input
  {
    tcId: 'Pos_Fun_0014',
    name: 'two word sentence',
    length: 'M',
    input: 'naan velai sairen aana konjathula poiruven veetuku vaa ',
    shouldContainTamil: true,
    covered: ['Multiple words', 'Combination']
  },
  {
    tcId: 'Pos_Fun_0015',
    name: 'three word sentence',
    length: 'M',
    input: 'naan sapitu velaikupogaporen vanthu rendu perum seanthu vilayaduvom ',
    shouldContainTamil: true,
    covered: ['Conjunction', 'Reason']
  },
  {
    tcId: 'Pos_Fun_0016',
    name: 'with punctuation',
    length: 'S',
    input: 'vaalthukal! ',
    shouldContainTamil: true,
    covered: ['Punctuation', 'Greeting']
  },
  {
    tcId: 'Pos_Fun_0017',
    name: 'with numbers',
    length: 'S',
    input: 'naan 7 naal veilikuponren ',
    shouldContainTamil: true,
    covered: ['Numbers', 'Action']
  },
  {
    tcId: 'Pos_Fun_0018',
    name: 'longer mixed',
    length: 'L',
    input: 'naan ippo thaan vilayada poga ready aayittu iruken aana nee modhalla namma veetukku vandhu enna un bike-ila eathikondu pona thaan nalla irukkum. namma rendu perum ground-ukku saenthu poiitu nalla vilayaduvom. ippadi poovathu enakku romba sandhoshama irukkum,  nee yosikama seekiram kilambi vaa.unakaga naan namma veettu gate kittaye kaathukondu irupen, thamaadham pannama seekirama vaa nanba ',
    shouldContainTamil: true,
    covered: ['Long input', 'Complex']
  },
  {
    tcId: 'Pos_Fun_0019',
    name: 'action with reason',
    length: 'M',
    input: 'naan iruka sollren  ',
    shouldContainTamil: true,
    covered: ['Explanation', 'Reason']
  },
  {
    tcId: 'Pos_Fun_0020',
    name: 'another question',
    length: 'S',
    input: 'ithu sariya? ',
    shouldContainTamil: true,
    covered: ['Query', 'Consent']
  },
  {
    tcId: 'Pos_Fun_0021',
    name: 'state verb',
    length: 'S',
    input: 'enakku puriyuthu ',
    shouldContainTamil: true,
    covered: ['Understanding', 'State']
  },
  {
    tcId: 'Pos_Fun_0022',
    name: 'polite form',
    length: 'S',
    input: 'neenga vanga ',
    shouldContainTamil: true,
    covered: ['Polite', 'Request']
  },
  {
    tcId: 'Pos_Fun_0023',
    name: 'negation with not',
    length: 'S',
    input: 'naan velaikku poga maaten ',
    shouldContainTamil: true,
    covered: ['Negation', 'Direction']
  },
  {
    tcId: 'Pos_Fun_0024',
    name: 'very long sentence',
    length: 'L',
    input: 'naan ippo thaan velaiku poga velikkittu kondu iruken aana enakku oru nalla yosunai vandhuchu nee modhalla namma veetukku vaa rendu perum serndhu ukandhu sapiduvom. sappadu mudichutu namma pesite bus yeridalam. romba naal achu ippadi serndhu poradhu, kandippa varuvennu nambaren. seekiram kilambi vaa, unakaga nalla rusiyaana sappadu amma thayaar senji vachi irrukanga. veliya nalla mazhai varum pola iruku kudai eduthukittu paathu bathirama vaa nanba',
    shouldContainTamil: true,
    covered: ['Length', 'Complexity']
  },
  {
    tcId: 'Pos_Fun_0025',
    name: 'query what you doing',
    length: 'S',
    input: 'enna panringa? ',
    shouldContainTamil: true,
    covered: ['Present action', 'Question']
  },

  // Negative test cases - should not convert
  {
    tcId: 'Neg_Fun_0001',
    name: 'no space between words',
    length: 'S',
    input: ' nalamairrukenNeenga ',
    shouldContainTamil: false,
    covered: ['Invalid', 'Error handling']
  },
  {
    tcId: 'Neg_Fun_0002',
    name: 'misspelled word',
    length: 'S',
    input: ' nalllamaaa ',
    shouldContainTamil: false,
    covered: ['Typo', 'Robustness']
  },
  {
    tcId: 'Neg_Fun_0003',
    name: 'random characters',
    length: 'S',
    input: 'xyz123abc ',
    shouldContainTamil: false,
    covered: ['Non-tamil', 'Invalid']
  },
  {
    tcId: 'Neg_Fun_0004',
    name: 'mixed english',
    length: 'S',
    input: 'naan chicken noodles sapidaren ',
    shouldContainTamil: false,
    covered: ['Mixed', 'Error']
  },
  {
    tcId: 'Neg_Fun_0005',
    name: 'incomplete',
    length: 'S',
    input: 'vang ',
    shouldContainTamil: false,
    covered: ['Partial', 'Invalid']
  },
  {
    tcId: 'Neg_Fun_0006',
    name: 'only symbols',
    length: 'S',
    input: '!@#$%^ ',
    shouldContainTamil: false,
    covered: ['Symbols', 'Invalid']
  },
  {
    tcId: 'Neg_Fun_0007',
    name: 'only numbers',
    length: 'S',
    input: '12345 ',
    shouldContainTamil: false,
    covered: ['Numbers only', 'Invalid']
  },
  {
    tcId: 'Neg_Fun_0008',
    name: 'repeated characters',
    length: 'S',
    input: 'naaaaaaaaaaan ',
    shouldContainTamil: false,
    covered: ['Repetition', 'Invalid']
  },
  {
    tcId: 'Neg_Fun_0009',
    name: 'very long invalid',
    length: 'L',
    input: 'an44n ippo th44n v3l@iku p0g4 th4y44r 44yikittu iruk3n @4n4 3n4kku oru n4ll4 y0sun4i v4ndhuchu. n33 m0dh4ll4 n4mm4 v33tukku v44, r3ndu p3rum s3rndhu uk4ndhu n4ll4 s4piduvom. s4pp4du mudichutu n4mm4 p3sit3 j0lly-@ bus y3rid4l4m. r0mb4 n44l 4chu ipp4di s3rndhu p0r4dhu, so k4n61994 v44. un4k4g4 n4ll4 rusiy44n4 chick3n n00dl3s @mm4 s3nji v4churuk44ng4, r0mb4 s33kir4m v44 n4nb4! v3liy4 n4ll4 m4zh4i v4rum p0l4 iruku so p44thu b4thir4m4 v44 ',
    shouldContainTamil: false,
    covered: ['Long invalid', 'Error']
  },
  {
    tcId: 'Neg_Fun_0010',
    name: 'mixed valid and invalid',
    length: 'M',
    input: 'na1n ch33s vilay5dur3n  n3eyu8 vaa v1lay4duv0m  ',
    shouldContainTamil: false,
    covered: ['Mixed', 'Error']
  },

  // UI test - typing behavior
  {
    tcId: 'Pos_UI_0001',
    name: 'real-time conversion test',
    length: 'S',
    input: 'naan velaikupoga poren ',
    shouldContainTamil: true,
    covered: ['Real-time', 'Typing', 'Updates', 'Conversion'],
    isUI: true
  }
];

// Helper function to check if text contains Tamil characters
function containsTamilCharacters(text) {
  // Tamil Unicode range: U+0B80 to U+0BFF
  const tamilRegex = /[\u0B80-\u0BFF]/;
  return tamilRegex.test(text);
}

// Helper function to escape CSV special characters
function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  const stringValue = String(str);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return '"' + stringValue.replace(/"/g, '""') + '"';
  }
  return stringValue;
}

// Setup results file
const resultsFile = path.join(__dirname, '../test-results/tamil-converter-results.csv');
const resultsDir = path.dirname(resultsFile);

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

if (fs.existsSync(resultsFile)) {
  fs.unlinkSync(resultsFile);
}

fs.writeFileSync(resultsFile, 'TC ID,Test Name,Input Length,Input,Expected,Actual Output,Status,Notes\n');

test.describe('Tamil Converter Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    try {
      await page.goto('https://tamil.changathi.com/', { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });
    } catch (e) {
      console.error('Navigation failed, retrying...', e.message);
      await page.goto('https://tamil.changathi.com/', { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });
    }
    
    try {
      await page.waitForLoadState('networkidle', { timeout: 15000 });
    } catch (e) {
      try {
        await page.waitForLoadState('load', { timeout: 10000 });
      } catch (e2) {
        await page.waitForTimeout(3000);
      }
    }
    
    await page.waitForTimeout(1000);
    const textarea = page.locator('#transliterateTextarea');
    await textarea.waitFor({ state: 'visible', timeout: 10000 });
  });

  for (const data of testData) {

    if (data.isUI) {
      test(`[UI] ${data.tcId}: ${data.name}`, async ({ page }) => {
        test.skip(data.skip, `Known site bug: ${data.tcId} conversion fails — see issue #123`);
        try {
          const inputField = page.locator('#transliterateTextarea');
          await inputField.waitFor({ state: 'visible', timeout: 10000 });

          await inputField.click();
          await inputField.fill('');
          await page.waitForTimeout(300);

          let previousContent = '';
          let outputUpdated = false;

          for (let i = 0; i < data.input.length; i++) {
            await inputField.type(data.input[i], { delay: 30 });
            await page.waitForTimeout(100);

            const currentContent = await inputField.inputValue();
            if (currentContent !== previousContent && currentContent.includes(data.input[i]) ) {
              outputUpdated = true;
            }
            previousContent = currentContent;
          }

          const finalContent = await inputField.inputValue();
          const hasTamilOutput = containsTamilCharacters(finalContent);

          const status = outputUpdated && hasTamilOutput ? 'Pass' : 'Fail';
          const notes = status === 'Pass' ? 'Real-time conversion worked' : 'Real-time conversion failed';

          const csvLine = `${escapeCSV(data.tcId)},${escapeCSV(data.name)},${data.length},${escapeCSV(data.input)},Real-time updates,${escapeCSV(finalContent)},${status},${escapeCSV(notes)}\n`;
          fs.appendFileSync(resultsFile, csvLine);
          console.log(`✓ ${data.tcId}: ${status} - ${notes}`);
        } catch (error) {
          const errorMsg = error.message.replace(/"/g, "'");
          const csvLine = `${escapeCSV(data.tcId)},${escapeCSV(data.name)},${data.length},${escapeCSV(data.input)},Real-time updates,Error,Fail,${escapeCSV(errorMsg)}\n`;
          fs.appendFileSync(resultsFile, csvLine);
          console.log(`✗ ${data.tcId}: Fail - ${error.message}`);
        }
      });
    } else {
      test(`[FUNC] ${data.tcId}: ${data.name}`, async ({ page }) => {
        test.skip(data.skip, `Known site bug: ${data.tcId} conversion fails — see issue #123`);
        try {
          const inputField = page.locator('#transliterateTextarea');
          
          let elementReady = false;
          for (let i = 0; i < 3; i++) {
            try {
              await inputField.waitFor({ state: 'visible', timeout: 5000 });
              elementReady = true;
              break;
            } catch (e) {
              if (i < 2) {
                await page.waitForTimeout(500);
              }
            }
          }
          
          if (!elementReady) {
            throw new Error('TextField not visible');
          }

          for (let i = 0; i < 3; i++) {
            try {
              await inputField.click({ timeout: 5000 });
              await inputField.fill('');
              break;
            } catch (e) {
              if (i === 2) throw e;
              await page.waitForTimeout(300);
            }
          }
          
          await page.waitForTimeout(300);

          // For long inputs use a fast fill and trigger input event; short inputs use type
          if (data.length === 'L' || data.input.length > 200) {
            // Use fill (faster) and dispatch an input event so any listeners run
            let filled = false;
            for (let i = 0; i < 3; i++) {
              try {
                await inputField.click({ timeout: 5000 });
                await inputField.fill(data.input);
                await inputField.evaluate((el) => el.dispatchEvent(new Event('input', { bubbles: true })));
                // ensure a trailing space to trigger conversion behaviour if not present
                if (!data.input.endsWith(' ')) {
                  await inputField.press('Space');
                }
                filled = true;
                break;
              } catch (e) {
                if (i === 2) throw e;
                await page.waitForTimeout(500);
              }
            }

            // Wait up to 15s for Tamil characters to appear in the textarea value
            try {
              await page.waitForFunction(
                (selector) => {
                  const el = document.querySelector(selector);
                  const v = (el && (el.value || el.innerText)) || '';
                  return /[\u0B80-\u0BFF]/.test(v);
                },
                '#transliterateTextarea',
                { timeout: 15000 }
              );
            } catch (e) {
              // fallback small wait so subsequent checks still run
              await page.waitForTimeout(2000);
            }

            // If still no Tamil output, try keystroke trick (Space → Backspace → Space) to force conversion
            const currentVal = await inputField.inputValue();
            if (!(/[\u0B80-\u0BFF]/.test(currentVal))) {
              for (let attempt = 0; attempt < 2; attempt++) {
                try {
                  await inputField.press('Space');
                  await page.waitForTimeout(200);
                  await inputField.press('Backspace');
                  await page.waitForTimeout(200);
                  await inputField.press('Space');

                  // Wait up to 10s for Tamil characters after keystroke sequence
                  await page.waitForFunction(
                    (selector) => {
                      const el = document.querySelector(selector);
                      const v = (el && (el.value || el.innerText)) || '';
                      return /[\u0B80-\u0BFF]/.test(v);
                    },
                    '#transliterateTextarea',
                    { timeout: 10000 }
                  );

                  // stop attempts if succeeded
                  break;
                } catch (err) {
                  // if this was last attempt, continue; else small wait and retry
                  if (attempt === 1) break;
                  await page.waitForTimeout(500);
                }
              }
            }
          } else {
            for (let i = 0; i < 3; i++) {
              try {
                await inputField.type(data.input, { delay: 50, timeout: 30000 });
                break;
              } catch (e) {
                if (i === 2) throw e;
                await inputField.fill('');
                await page.waitForTimeout(500);
              }
            }

            // Small wait for conversion to complete
            await page.waitForTimeout(1000);
          }

          const textareaContent = await inputField.inputValue();
          const hasTamilOutput = containsTamilCharacters(textareaContent);

          let status = 'Fail';
          let notes = '';

          if (data.tcId.startsWith('Pos_Fun')) {
            status = data.shouldContainTamil && hasTamilOutput ? 'Pass' : 'Fail';
            notes = status === 'Pass' ? 'Tamil conversion successful' : `No Tamil output. Content: "${textareaContent.substring(0, 50)}"`;
          } else if (data.tcId.startsWith('Neg_Fun')) {
            status = !data.shouldContainTamil && !hasTamilOutput ? 'Pass' : 'Fail';
            notes = status === 'Pass' ? 'Correctly no Tamil output' : `Unexpectedly produced Tamil: "${textareaContent.substring(0, 50)}"`;
          }

          const csvLine = `${escapeCSV(data.tcId)},${escapeCSV(data.name)},${data.length},${escapeCSV(data.input)},${data.shouldContainTamil ? 'Tamil output' : 'No Tamil output'},${escapeCSV(textareaContent)},${status},${escapeCSV(notes)}\n`;
          fs.appendFileSync(resultsFile, csvLine);
          console.log(`✓ ${data.tcId}: ${status} - ${notes}`);
        } catch (error) {
          const errorMsg = error.message.replace(/"/g, "'");
          const csvLine = `${escapeCSV(data.tcId)},${escapeCSV(data.name)},${data.length},${escapeCSV(data.input)},Expected,Error,Fail,${escapeCSV(errorMsg)}\n`;
          fs.appendFileSync(resultsFile, csvLine);
          console.log(`✗ ${data.tcId}: Fail - ${error.message}`);
        }
      });
    }
  }
});