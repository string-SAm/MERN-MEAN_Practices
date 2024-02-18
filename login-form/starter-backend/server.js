// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3001;

// app.use(bodyParser.json());

// const users = [];

// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   if (users.some((user) => user.username === username)) {
//     return res.status(400).json({ error: 'User already exists' });
//   }

//   const newUser = { username, password };
//   users.push(newUser);

//   res.status(201).json({ message: 'User created successfully' });
// });


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find((user) => user.username === username);

//   if (user && user.password === password) {
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// app.use('/',(req,res)=>{
//     res.send({
//     token:'test123'
//     })
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
