document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const lengthInput = document.getElementById('length');
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const notification = document.getElementById('notification');

    // Generate password on button click
    generateBtn.addEventListener('click', generatePassword);

    // Generate password on Enter key in length input
    lengthInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            generatePassword();
        }
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', copyToClipboard);

    // Initial password generation
    generatePassword();

    async function generatePassword() {
        const length = parseInt(lengthInput.value);
        
        if (length < 8 || length > 128 || isNaN(length)) {
            showError('Please enter a length between 8 and 128');
            return;
        }

        try {
            const response = await fetch(`/generate?length=${length}`);
            if (!response.ok) {
                throw new Error('Failed to generate password');
            }
            const data = await response.json();
            passwordInput.value = data.password;
            updateStrengthMeter(data.password);
        } catch (error) {
            showError('Error generating password. Please try again.');
            console.error(error);
        }
    }

    function updateStrengthMeter(password) {
        if (!password) return;
        
        // Calculate password entropy
        const charTypes = {
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^a-zA-Z0-9]/.test(password)
        };
        
        // Count number of character types used
        const typeCount = Object.values(charTypes).filter(Boolean).length;
        
        // Calculate character pool size
        let poolSize = 0;
        if (charTypes.lower) poolSize += 26;
        if (charTypes.upper) poolSize += 26;
        if (charTypes.number) poolSize += 10;
        if (charTypes.special) poolSize += 16; // common special chars
        
        // Calculate entropy (log2(poolSize^length))
        const entropy = Math.log2(Math.pow(poolSize, password.length));
        
        // Normalize to 0-100 scale (for display purposes)
        let strength = Math.min(entropy / 128 * 100, 100);
        
        // Adjust based on length (longer passwords are better)
        strength = strength * 0.7 + (password.length / 128 * 100 * 0.3);
        
        // Update the strength meter
        const bar = strengthBar.firstElementChild || document.createElement('div');
        bar.style.width = `${strength}%`;
        
        // Remove all color classes
        bar.className = '';
        
        // Set color based on strength
        if (strength < 30) {
            bar.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength < 50) {
            bar.classList.add('moderate');
            strengthText.textContent = 'Moderate';
        } else if (strength < 70) {
            bar.classList.add('strong');
            strengthText.textContent = 'Strong';
        } else {
            bar.classList.add('very-strong');
            strengthText.textContent = 'Very Strong';
        }
        
        // Add bar to DOM if it wasn't there
        if (!strengthBar.contains(bar)) {
            strengthBar.appendChild(bar);
        }
    }

    function copyToClipboard() {
        if (!passwordInput.value) return;
        
        passwordInput.select();
        document.execCommand('copy');
        
        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    function showError(message) {
        // You could implement a more sophisticated error display
        alert(message);
    }
});