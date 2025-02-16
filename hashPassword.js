const bcrypt = require('bcryptjs');

const password = "yourpassword"; // Change this to the password you want to hash

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Hashed Password:", hashedPassword);
    }
});
