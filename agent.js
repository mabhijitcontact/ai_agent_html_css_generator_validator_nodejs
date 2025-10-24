const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runAgent() {
  readline.question("Enter a description for the HTML/CSS (e.g., 'a simple login form'): ", async (description) => {
    try {
      const genResponse = await axios.post('http://localhost:5000/generate', { description });
      const genData = genResponse.data;
      if (genData.error) {
        console.log(`Generation error: ${genData.error}`);
        readline.close();
        return;
      }
      const { html, css } = genData;
      console.log('\nGenerated HTML:\n', html);
      console.log('\nGenerated CSS:\n', css);

      const valResponse = await axios.post('http://localhost:5001/validate', { html, css });
      const valData = valResponse.data;
      console.log('\nValidation Results:');
      console.log('HTML Valid:', valData.html_valid);
      console.log('CSS Valid:', valData.css_valid);
      console.log('\nDetailed HTML Messages:', JSON.stringify(valData.results.html.messages || [], null, 2));
      console.log('\nDetailed CSS Results:', JSON.stringify(valData.results.css.cssvalidation || {}, null, 2));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
    readline.close();
  });
}

runAgent();