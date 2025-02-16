const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define User Model (if not already imported)
const User = require('./models/User');

async function updatePassword(email, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await User.updateOne(
            { email: email }, // Find user by email
            { $set: { password: hashedPassword } } // Update password
        );

        console.log('Password updated:', result);
        mongoose.connection.close(); // Close DB connection
    } catch (error) {
        console.error('Error updating password:', error);
    }
}

// Call function with email & new password
updatePassword('johndoe@example.com', '$2a$10$5b3v3npyFTpn1AyLKiXHse75qFPxT7xMCVDMpGZAvxw7iDAhfDmzW');
