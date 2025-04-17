# Business Website Template

### Light mode:

![Image](https://github.com/user-attachments/assets/d971ab49-6305-482a-9286-e8126311c8b1)

![Image](https://github.com/user-attachments/assets/e60a0363-248f-40d2-a858-7ebe447a7216)

![Image](https://github.com/user-attachments/assets/46897cab-dbdf-4511-88c9-5f7aa4afcae4)

![Image](https://github.com/user-attachments/assets/71fd87c0-74bd-472e-949b-6b761b7f31f6)

![Image](https://github.com/user-attachments/assets/9faa6b7d-b0b9-4cca-8c2d-9f83e03b55f2)

![Image](https://github.com/user-attachments/assets/e44c9d09-eab4-4002-9fea-e5e20fff82fd)

### Dark mode:
![Image](https://github.com/user-attachments/assets/52595a0f-8100-4c20-995e-a44ee1dd9b86)

### Responsive mode:

![Image](https://github.com/user-attachments/assets/a213d7d0-2fbe-426c-b557-b2fcacadc722)

This template is a fully functional business website built with **React 18** (using **TypeScript 4**), **Material UI 5**, **Django 4**, and **Django REST Framework 3**.

## Table of Contents
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Launch Application](#launch-application)
- [Quality Assurance](#quality-assurance)
- [Data Management](#data-management)
- [Customization Guide](#customization-guide)
- [License](#license)

## Requirements

Essential components to install:

1. [Python 3.8-3.11](https://www.python.org/downloads/)  
   *Required for Django 4.2.4 - [Compatibility Guide](https://django.readthedocs.io/en/stable/faq/install.html)*
2. [Node.js LTS](https://nodejs.org/en/)
3. [VS Code](https://code.visualstudio.com/) (Recommended IDE)

## Setup Instructions

### Backend Configuration

#### 1. Initialize Virtual Environment

Open your terminal, navigate to the backend folder, and run:

```bash
cd backend
python -m venv venv
```

#### 2. Activate Environment

On macOS:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\scripts\activate
```

#### 3. Install Dependencies

Within the backend directory, install the required packages:

```bash
pip install -r requirements.txt
```

#### 4. Database Setup

Execute the following commands to apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 5. Admin Credentials

To access the Django admin panel, create an admin user:

```bash
python manage.py createsuperuser
```

Provide a username, email, and password when prompted.

### Frontend Configuration

#### 1. Install Packages

From the project root, navigate to the frontend folder and install the dependencies:

```bash
cd frontend
npm install
```

## Launch Application

To run the full application, you need both the backend and frontend servers running concurrently.

### 1. Start Backend Server

From the backend folder, run:

```bash
python manage.py runserver
```

### 2. Launch Frontend

From the frontend folder, run:

```bash
npm start
```

Once both servers are running, open your browser and navigate to http://localhost:3000/ to view the application.

## Data Management

You can add data to the application through Django Admin.
Open your browser and visit http://127.0.0.1:8000/admin to log in with your admin credentials and manage your data.
