from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from typing import Optional
import random
app = FastAPI(
    title="Password Generator",
    description="Generates secure random passwords",
    version="1.0"
)

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_root(request: Request):
    """Render the homepage"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/generate")
def generate_password(length: int = 15):
    """Generate a random password"""
    if length < 8 or length > 128:
        return {"password": "", "error": "Length must be between 8 and 128"}
    
    # Character sets
    lowercase = "abcdefghjkmnpqrstuvwxyz"  # removed confusing letters
    uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    digits = "23456789"  # removed 0,1
    special = "!@#$%^&*-_=+?"
    all_chars = lowercase + uppercase + digits + special

    # Ensure at least one of each type
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(special)
    ]

    # Fill remaining length
    password += random.choices(all_chars, k=length-4)

    # Shuffle and return
    random.shuffle(password)
    return {"password": "".join(password)}

if __name__ == "__main__":
    uvicorn.run(app, port=8000)