const express = require('express');
const OpenAI = require('openai');
const app = express();

app.use(express.json());

// Set up OpenAI API
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY environment variable is not set. Get one from https://platform.openai.com/api-keys');
}
const openai = new OpenAI({ apiKey });

app.post('/generate', async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    const prompt = `
      Generate valid HTML and CSS for: ${description}.
      Output only the code in JSON format with keys 'html' and 'css'.
      Ensure it follows W3C standards: semantic HTML, no errors.
      Example output: {"html": "<html>...</html>", "css": "body { ... }"}
    `;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });
    // Clean the response to remove markdown code blocks
    let content = response.choices[0].message.content.trim();
    content = content.replace(/^```json\n/, '').replace(/\n```$/, '');
    const result = JSON.parse(content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Generator service running on http://0.0.0.0:${port}`);
});

if (process.argv.includes('--console')) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question('Enter a description for the HTML/CSS: ', async (description) => {
    try {
      const prompt = `
        Generate valid HTML and CSS for: ${description}.
        Output only the code in JSON format with keys 'html' and 'css'.
        Ensure it follows W3C standards: semantic HTML, no errors.
        Example output: {"html": "<html>...</html>", "css": "body { ... }"}
      `;
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });
      // Clean the response to remove markdown code blocks
      let content = response.choices[0].message.content.trim();
      content = content.replace(/^```json\n/, '').replace(/\n```$/, '');
      const result = JSON.parse(content);
      console.log('\nGenerated HTML:\n', result.html || '');
      console.log('\nGenerated CSS:\n', result.css || '');
      if (result.error) console.log('Error:', result.error);
    } catch (error) {
      console.error('Error:', error.message);
    }
    readline.close();
  });
}