const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/validate', async (req, res) => {
  const { html, css } = req.body;
  if (!html || !css) {
    return res.status(400).json({ error: 'HTML and CSS are required' });
  }

  const results = { html: {}, css: {} };
  try {
    const htmlResponse = await axios.post(
      'https://validator.w3.org/nu/?out=json',
      html,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
    results.html = htmlResponse.data;
  } catch (error) {
    results.html = { error: error.message };
  }

  try {
    const cssResponse = await axios.post(
      'https://jigsaw.w3.org/css-validator/validator?output=json&profile=css3',
      new URLSearchParams({ text: css }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    results.css = cssResponse.data;
  } catch (error) {
    results.css = { error: error.message };
  }

  const htmlValid = (results.html.messages || []).length === 0;
  const cssValid = results.css.cssvalidation?.validity || false;

  res.json({
    results,
    html_valid: htmlValid,
    css_valid: cssValid,
  });
});

const port = 5001;
app.listen(port, () => {
  console.log(`Validator service running on http://0.0.0.0:${port}`);
});