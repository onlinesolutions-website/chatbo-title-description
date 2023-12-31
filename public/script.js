// Get references to HTML elements
const keywordsInput = document.getElementById('userInput');
const submitButton = document.getElementById('submitBtn');
const titleDiv = document.getElementById('titlesResponse').querySelector('p');
const descriptionDiv = document.getElementById('descriptionResponse').querySelector('p');

// Add an event listener to the submit button
submitButton.addEventListener('click', async () => {
    // Get the input value, split it by commas, and take up to 5 keywords
    const keywords = keywordsInput.value.split(',').slice(0, 5);
    
    // Construct a prompt using the keywords
    const promptText = `Generate a video title and a 100-word description based on these keywords: ${keywords.join(', ')}`;

    try {
        // Make an API request to OpenAI
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promptText })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        // Parse the API response
        const data = await response.json();
        const generatedText = data.choices[0].text.trim().split('\n');
        
        // Extract the title and description
        const title = generatedText[0];
        const description = generatedText.slice(1).join(' ');

        // Display the title and description in their respective HTML elements
        titleDiv.textContent = title;
        descriptionDiv.textContent = description;
    } catch (error) {
        // Handle errors gracefully, e.g., log them to the console
        console.error('An error occurred:', error);
    }
});
