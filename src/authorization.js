const jwt = require('jsonwebtoken');
const {LibraryRoles} = require("./roles")

class LibraryAuth {
    privateKey

    constructor(privateKey) {
        this.privateKey = privateKey
    }

    getLibraryAuth (privateKey){
        return new LibraryAuth(privateKey)
    }

    generateToken({id, email, role}) {
        return new Promise((resolve) => {
            jwt.sign({id, email, role}, this.privateKey, {algorithm: 'HS256'},
                (err, token) => {
                    resolve(token);
                });
        });
    };


    verifyToken(t) {
        return new Promise((resolve, reject) => {
            if (!/^Barrer /.test(t))
                return reject("Should Barrer the token")
            const token = t.replace('Barrer ', '');
            jwt.verify(token, this.privateKey, (err, decoded) => {
                if (err) {
                    reject(Error);
                }
                resolve(decoded)
            })

        })
    }

    decodeToken(req, res, next) {
        this.verifyToken(req.headers['x-access-token']).then(res => {
            req.decoded = {};
            req.decoded.email = res.data.decoded.email;
            req.decoded.id = res.data.decoded.id;
            req.decoded.role = res.data.decoded.role;
            next();

        }).catch(e => {
            return res.status(401).json({message: 'Auth failed',});
        })
    };

    verifyPermission = (role) => (req, res, next) => {
        if (req.decoded.role === role) {
            next();
            return;
        }
        return res.status(401).json({message: 'Permission denied'});
    };

    equalField = (field) => (req, res, next) => {
        if (req.decoded.role === LibraryRoles.ADMIN) {
            next();
            return;
        }

        if (req.params[field] === req.decoded[field]) {
            next();
            return;
        }
        return res.status(401).json({message: 'Permission denied',});
    };
}

module.exports = LibraryAuth
