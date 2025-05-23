📚 TutorTrek – E-Learning Platform  https://tutor-trek-one.vercel.app/

A comprehensive online learning platform that connects teachers and students. Teachers can upload courses, and students can access and watch them.

Built with:

TypeScript | JavaScript | React.js | Node.js | Express.js | Docker | Clean Architecture | MongoDB

⚙️ Installation

Clone the Repository:
git clone 
cd TutorTrek
Navigate to client and server directories:
cd client
npm install
cd ../server
npm install
Set up environment variables:
Rename .env.example to .env in the server directory and provide the necessary values:

PORT
MONGODB_URI
🚀 Usage

Start Development Servers:
Server Side

npm run dev
Client Side

cd client
npm start
🧑‍🏫 Features

👩‍🏫 Teacher and student registration/login
📊 Teacher dashboard to manage courses and track student engagement
🎓 Student dashboard to browse and access courses
📁 Course upload and management system
🎥 Video playback integration for students
🛠️ Admin panel to manage users, content, and system settings
🧱 Architecture & Tech Stack

🔧 Backend:
Node.js + Express.js
MongoDB + Mongoose
TypeScript
🎨 Frontend:
React
Redux (State Management)
Tailwind CSS (Styling)
📁 Folder Structure

.
├── /client           # Frontend codebase
├── /server           # Backend codebase
└── /conf.d           # Nginx configuration (for deployment)
🛠️ Additional Libraries & Tools

Multer – File uploads (e.g., videos, thumbnails)
Cloudinary – Cloud-based image/video hosting and transformation
Helmet – Security middleware for setting HTTP headers
Nodemailer – Email services for notifications and password resets
express-mongo-sanitize – Protection against NoSQL injections
express-async-handler – Simplified async error handling
react-oauth – OAuth support (e.g., Google login)
Yup – Form validation schema library
Axios – HTTP client for frontend API calls
Formik – Form state management in React
🧠 Concepts Implemented

Clean Architecture – Separation of concerns and scalable code structure
JWT Authentication – Secure login with role-based access
Containerization – Docker-ready setup for deployment
