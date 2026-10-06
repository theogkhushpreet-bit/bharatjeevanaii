const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user-message');
    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

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

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const rawText = await response.text();
            throw new Error(`Server returned non-JSON response (${response.status}): ${rawText.slice(0, 100)}`);
        }

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
        appendMessage(`Error: ${error.message}`, 'ai-message error');
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
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatBox.appendChild(messageDiv);
}
