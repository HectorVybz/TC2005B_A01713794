const bcrypt = require("bcryptjs");

const db = require("../util/database");

module.exports = class UserModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    save() {
        return bcrypt.hash(this.password, 12)
            .then(hashedPassword => {
                return db.execute(
                    "INSERT INTO usuarios (username, password) VALUES (?, ?)",
                    [this.username, hashedPassword]
                );
            });
    }

    static findByUsername(username) {
        return db.execute(
            "SELECT * FROM usuarios WHERE username = ?",
            [username]
        );
    }
};
