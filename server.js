const PORT = 8000;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = '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';

app.post('/completions', async (req, res) => {
    const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			max_tokens: 100,
			temperature: 0,
			messages: req.body?.messages ?? {
				role: 'user', content: req.body.message
			},
		})
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (e) {
        console.error(e);
    }
})

app.listen(PORT, () => console.log(`Your server is running on port: ${PORT}`));

