import random
import string
length = int(input("Enter the length of the password: "))
lowercase = input("Include lowercase letters? (yes or no): ").lower() == 'yes'
uppercase = input("Include uppercase letters? (yes or no): ").lower() == 'yes'
digits = input("Include digits? (yes or no): ").lower() == 'yes'
special = input("Include Special characterS? (yes or no): ").lower() == 'yes'
characters = ''
if lowercase:
    characters += string.ascii_lowercase
if uppercase:
    characters += string.ascii_uppercase
if digits:
    characters += string.digits
if special:
    characters += string.punctuation

if not characters:
    raise ValueError("You have to select at least one type of character.")
password = ''.join(random.choice(characters) for _ in range(length))
print(f"Generated password is: {password}")
