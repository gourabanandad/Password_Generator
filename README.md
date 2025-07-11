# 🔐 Secure Password Generator API + Frontend


## 🌟 Features

- **Secure Password Generation**: Creates cryptographically strong passwords
- **Customizable Length**: Generate passwords from 4 to 128 characters
- **Strength Meter**: Visual feedback on password strength
- **Copy Functionality**: One-click copy to clipboard
- **Responsive Design**: Works on all devices
- **FastAPI Backend**: High-performance Python backend
- **Ready for Deployment**: Easy deployment to Render

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python with FastAPI
- **Hosting**: Render (or any PaaS)
- **Dependencies**: See `requirements.txt`

## 🚀 Deployment

### Prerequisites
- Python 3.9+
- Render account (or alternative hosting)

### Steps to Deploy on Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository** containing this project
3. Set these configuration options:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
4. Set Python version to 3.9 or higher
5. Click **Deploy**!

### Local Development

```bash
# Clone the repository
git clone https://github.com/gourabanandad/PASSWORD_GENERATOR.git
cd pPASSWORD_GENERATOR

# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn app:app --reload

# Access at http://localhost:8000
```

## 📂 Project Structure

```
password-generator/
├── static/               # Frontend static files
│   ├── style.css         # Main stylesheet
│   └── script.js         # Main JavaScript logic
├── templates/            # HTML templates
│   └── index.html        # Main frontend page
├── app.py               # FastAPI backend
└── requirements.txt      # Python dependencies
```

## 🧠 How It Works

1. **Password Generation**:
   - Backend generates passwords with:
     - Lowercase letters
     - Uppercase letters
     - Numbers
     - Special characters
   - Ensures at least one of each character type

2. **Strength Calculation**:
   - Calculates password entropy based on:
     - Character pool size
     - Password length
   - Classifies strength into 4 levels

3. **Frontend**:
   - Clean, responsive interface
   - Real-time strength feedback
   - Copy functionality with visual confirmation

## 🔧 Customization

### Change Character Sets

Edit in `app.py`:
```python
# Current character sets
lowercase = "abcdefghjkmnpqrstuvwxyz"  # removed confusing letters
uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ"
digits = "23456789"  # removed 0,1
special = "!@#$%^&*-_=+?"
```

### Adjust Strength Calculation

Edit in `static/script.js`:
```javascript
// Adjust these thresholds if needed
if (strength < 30) {
    // Weak
} else if (strength < 50) {
    // Moderate
} else if (strength < 70) {
    // Strong
} else {
    // Very Strong
}
```

## 📜 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgements

- FastAPI for the awesome backend framework
- Render for easy deployment
- Font Awesome for icons

---

## ☕ Support My Work

If you find this project useful, consider buying me a coffee or sponsoring me:

[![Buy Me a Coffee](https://img.shields.io/badge/☕-Buy%20me%20a%20coffee-orange)](https://www.buymeacoffee.com/gourabanandad)
[![Sponsor on GitHub](https://img.shields.io/badge/❤️-Sponsor%20me-red)](https://github.com/sponsors/gourabanandad)
