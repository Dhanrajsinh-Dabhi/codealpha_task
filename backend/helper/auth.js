const bcrypt =require('bcrypt');

//  function to hash password
module.exports =function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

// when user wants to login then compare the password
module.exports= async function comparePassword(password, hashed) {
    return await bcrypt.compare(password, hashed); // true/false
}