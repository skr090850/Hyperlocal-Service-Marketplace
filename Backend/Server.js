const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const User = require('../Backend/Models/User');

const userRoutesImport = require('./Routes/userRoutes');
const userRoutes = userRoutesImport.default;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

app.post("/userRegister", (req, res) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// const PORT = 5040;
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const User = require('../Backend/Models/User');
// const Provider = require('../Backend/Models/Provider');
// const dotenv = require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb+srv://av874559:av874559@infotactcluster.jnegacd.mongodb.net/")
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.error('MongoDB connection error:', err));
// app.post('/register', (req, res) => {
//     User.create(req.body)
//         .then(user => res.json(user))
//         .catch(err => res.json(err)); 
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })