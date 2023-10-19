const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// Allow embedding in an iframe on https://bsocial.buzz
app.use((req, res, next) => {
  res.header("X-Frame-Options", "ALLOW-FROM https://bsocial.buzz");
  res.header("Content-Security-Policy", "frame-ancestors https://bsocial.buzz");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/query', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "what is bsocial\n"
        },
        {
          role: "user",
          content: req.body.question
        }
      ],
      temperature: 0.4,
      max_tokens: 3028,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
