const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // Append user message
    appendMessage(message, 'user-message');
    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show typing indicator
    typingIndicator.classList.remove('hidden');
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        typingIndicator.classList.add('hidden');

        if (data.success) {
            appendMessage(data.answer, 'ai-message');
        } else {
            appendMessage(data.error || 'Sorry, something went wrong.', 'ai-message error');
        }
    } catch (error) {
        typingIndicator.classList.add('hidden');
        console.error('Connection error:', error);
        appendMessage('Unable to connect to Bharat Jeevan AI server. Please check your internet connection.', 'ai-message error');
    }

    chatBox.scrollTop = chatBox.scrollHeight;
});

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className.includes('user') ? 'user-message' : 'ai-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = className.includes('user') ? '🧑' : '🇮🇳';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Simple line break formatting
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatBox.appendChild(messageDiv);
}
