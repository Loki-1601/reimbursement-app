# Employee Reimbursement App

This repository contains a minimal Employee Reimbursement Web Application. The project demonstrates a basic feature for employees to submit a receipt for reimbursement. It includes a frontend built with React (Vite, Tailwind CSS) and a backend API built with Django and Django Ninja. Database is SQLite.

## Contents

- **Frontend:** React with Vite and Tailwind CSS.
- **Backend:** Django with Django Ninja.
- **Database:** SQLite

## How to Run the App

### Prerequisites

- Python 3.8+ installed.
- Node.js installed.
- Git installed.

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Loki-1601/employee-reimbursement-app.git
   cd employee-reimbursement-app/backend

2. **Create and activate a virtual environment**
    python3 -m venv venv
    source venv/bin/activate

3. **Install backend dependencies**
    pip install -r requirements.txt

4. **Apply migrations**
    python3 manage.py makemigrations
    python3 manage.py migrate

5. **Run the Developemnt server**
    python3 manage.py runserver
    **The API will be available at http://127.0.0.1:8000/api/submit**

6. **Naviagate to Frontend folder**
    cd ../frontend

7. **Install all the frontened dependencies**
    npm install

8. **Run the developemnt server**
    npm run dev
    **The app should be available on the URL provided by Vite, mostly http://localhost:5173**

9. **Running tests**
    **Activate Virtual Environment in backend folder**
    python3 manage.py test
