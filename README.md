Employee Reimbursement App

This repository contains a minimal Employee Reimbursement Web Application. The project demonstrates a basic feature for employees to submit a receipt for reimbursement. It includes a frontend built with React (Vite, Tailwind CSS) and a backend API built with Django and Django Ninja. Database is SQLite.
Note - Since the project's scope is to handle the submission, validation, and storage of receipt details rather than processing the file content (such as OCR) and using Tesseract.js for frontend and Tesseract.py for backend, I have not used any of those functions. 

Contents

Frontend: React with Vite and Tailwind CSS.
Backend: Django with Django Ninja.
Database: SQLite
How to Run the App

Prerequisites

Python 3.8+ installed.
Node.js installed.
Git installed.
Backend Setup

Clone the repository:

git clone https://github.com/Loki-1601/employee-reimbursement-app.git
cd employee-reimbursement-app/backend
Create and activate a virtual environment python3 -m venv venv source venv/bin/activate

Install backend dependencies pip install -r requirements.txt

Apply migrations python3 manage.py makemigrations python3 manage.py migrate

Run the Developemnt server python3 manage.py runserver The API will be available at http://127.0.0.1:8000/api/submit

Naviagate to Frontend folder cd ../frontend

Install all the frontened dependencies npm install

Run the developemnt server npm run dev The app should be available on the URL provided by Vite, mostly http://localhost:5173

Running tests Activate Virtual Environment in backend folder python3 manage.py test
