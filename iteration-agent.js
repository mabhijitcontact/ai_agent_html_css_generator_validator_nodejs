// File: iteration-agent.js
const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runIterationAgent() {
  readline.question("Enter a description for the HTML/CSS (e.g., 'a simple login form'): ", async (description) => {
    const maxIterations = 3;
    let currentIteration = 1;
    let currentDescription = description;

    while (currentIteration <= maxIterations) {
      console.log(`\nIteration ${currentIteration}/${maxIterations}:`);
      try {
        // Generate HTML/CSS
        const genResponse = await axios.post('http://localhost:5000/generate', { description: currentDescription });
        const genData = genResponse.data;
        if (genData.error) {
          console.log(`Generation error: ${genData.error}`);
          break;
        }
        const { html, css } = genData;
        console.log('\nGenerated HTML:\n', html);
        console.log('\nGenerated CSS:\n', css);

        // Validate HTML/CSS
        const valResponse = await axios.post('http://localhost:5001/validate', { html, css });
        const valData = valResponse.data;
        console.log('\nValidation Results:');
        console.log('HTML Valid:', valData.html_valid);
        console.log('CSS Valid:', valData.css_valid);
        console.log('\nDetailed HTML Messages:', JSON.stringify(valData.results.html.messages || [], null, 2));
        console.log('\nDetailed CSS Results:', JSON.stringify(valData.results.css.cssvalidation || {}, null, 2));

        // Check if validation passed
        if (valData.html_valid && valData.css_valid) {
          console.log('\nValidation successful! No further iterations needed.');
          break;
        }

        // Prepare feedback for next iteration
        const htmlErrors = valData.results.html.messages?.map(msg => `${msg.type}: ${msg.message} at line ${msg.lastLine}`).join('; ') || 'No HTML errors';
        const cssErrors = valData.results.css.cssvalidation?.errors?.map(err => `${err.message} at line ${err.line}`).join('; ') || 'No CSS errors';
        currentDescription = `
          Original description: ${description}.
          Generated HTML/CSS had validation issues. Fix the following:
          HTML errors: ${htmlErrors}.
          CSS errors: ${cssErrors}.
          Output only the code in JSON format with keys 'html' and 'css'.
          Ensure it follows W3C standards: semantic HTML, no errors.
        `;
        currentIteration++;
        if (currentIteration > maxIterations) {
          console.log('\nMax iterations reached. Validation issues persist.');
        }
      } catch (error) {
        console.error(`Error in iteration ${currentIteration}: ${error.message}`);
        break;
      }
    }
    readline.close();
  });
}

runIterationAgent();