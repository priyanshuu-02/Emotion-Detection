
const express = require('express');
const path = require('path');
const app = express();

async function submitEntry() {
    const entryText = document.getElementById("entry").value;
  
    const response = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: entryText })
    });
  
    const data = await response.json();
  
    // Show results
    document.getElementById("result").style.display = "block";
    document.getElementById("emoji").innerText = data.emoji;
    document.getElementById("gif").src = data.gif;
    document.getElementById("quote").innerText = `"${data.quote}"`;
  }
  
  const submitButton = document.getElementById('submitButton');
  const journalInput = document.getElementById('journalInput');
  const resultContainer = document.getElementById('resultContainer');
  
  submitButton.addEventListener('click', async () => {
    const journalText = journalInput.value;
  
    // Ensure there is text before submitting
    if (!journalText.trim()) {
      alert("Please write something in your journal!");
      return;
    }
  
    try {
      // Send the journal entry to the backend
      const response = await fetch('/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entry: journalText })
      });
  
      const data = await response.json();
  
      // Display the results (emoji, quote, and gif)
      resultContainer.innerHTML = `
        <h3>Your Mood: ${data.mood} ${data.emoji}</h3>
        <p><strong>Quote:</strong> "${data.quote}"</p>
        <img src="${data.gif}" alt="Mood GIF" style="max-width: 100%; height: auto;">
      `;
  
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
  
  
  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  