🏥 Hospital Appointment Booking App
This is a Node.js + Express.js web application for managing hospital appointments with user authentication, patient details, and MongoDB storage.

✨ Features
✅ User Registration & Login

Secure registration with hashed passwords

Session-based authentication

✅ Appointment Booking

Choose date and time

Enter doctor’s name and specialisation

Provide patient details:

Name

Phone

Email

Symptoms or reason for visit

✅ Confirmation Page

See a success message after booking

✅ MongoDB Integration

All users and appointments stored in MongoDB collections

✅ Clean UI

EJS templating with styled forms and background image

📷 Screenshots
(Example: You can include screenshots if you like)

Home Page	Register Page	Booking Page

Note: All data shown is fictional and for demonstration purposes only.

🛠 Tech Stack
Node.js

Express.js

MongoDB (Mongoose)

EJS templates

CSS

🚀 Installation & Setup
1️⃣ Clone this repository


git clone https://github.com/YOUR_USERNAME/hospital-appointment-booking.git
cd hospital-appointment-booking
2️⃣ Install dependencies


npm install
3️⃣ Start MongoDB

Make sure MongoDB is running locally:


mongod
By default, the app connects to:


mongodb://localhost:27017/appointments
4️⃣ Run the application


node app.js
5️⃣ Open in your browser


http://localhost:3000
📂 Project Structure
hospital-appointment-booking/
├── app.js                  # Main server file
├── package.json            # NPM dependencies and scripts
|
│
├── /models                 # Mongoose schemas
│   ├── User.js
│   └── Appointment.js
│
├── /routes                 # Route definitions (optional if you prefer)
│   ├── auth.js             # Login/register/logout routes
│   └── appointments.js     # Booking and confirmation routes
│
├── /views                  # EJS templates for pages
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── book.ejs
│   ├── confirm.ejs
│   └── message.ejs
│
├── /public                 # Static assets
│   ├── style.css           # All CSS styles
│   
│
├
│  
│
└── README.md               # Project description and setup guide
