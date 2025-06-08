## Prerequisites
- Node.js  v18+


step 1:
clone repo: git clone

step 2:
install node package in both backend and frontend folder: node install

step 3:
nothing in rootfolder > frontend > .env file
add this env variable in rootfolder > backend > .env file:

PORT=3000
MONGODB_URI=mongodb+srv://aniketypandit99:K40t9sEJTY4vshMv@e-commerce-project.sqtnv.mongodb.net/
JWT_SECRET=vdalerpclkcel
NODE_ENV=production

step 4:
run backend and run frontend
commands:
got to backend folder run this command: node server.js
got ot frontend folder run this command: npm run dev
