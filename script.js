const keywordsInput = document.getElementById('keywords');
const submitButton = document.getElementById('submit');
const titleDiv = document.getElementById('title');
const descriptionDiv = document.getElementById('description');

submitButton.addEventListener('click', async () => {
    const keywords = keywordsInput.value.split(',').slice(0, 5); // Take up to 5 keywords
    const prompt = `Generate a video title and a 100-word description based on these keywords: ${keywords.join(', ')}`;

    // Call OpenAI API (make sure to handle this securely in a real-world scenario)
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const generatedText = data.choices[0].text.trim().split('\n');
    const title = generatedText[0];
    const description = generatedText.slice(1).join(' ');

    titleDiv.textContent = title;
    descriptionDiv.textContent = description;

    titleDiv.style.display = 'block';
    descriptionDiv.style.display = 'block';
});
