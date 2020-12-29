# Library.io-libs

An implementation of JSON Web Tokens.

## Initialize

```
const LibraryAuth = require("library.io-libs/dist/authorization")

const libraryAuth = new LibraryAuth(process.env.TOKEN_PRIVATE_KEY)
```
* Define Library role enum
```
ADMIN
CLIENT
AUTHOR 
``` 
| Function | Explain |
| ------ | ------ |
| **generateToken** | Generate token with the private key |
| **decodeToken** | Get jwt token fields (middleware)|
| **verifyPermission** | Verify token has correct role (middleware)|
| **equalField** | Verify token has correct Field value* (middleware) |

#### Examples
```
router.put("/:id", [decodeToken], (async (req, res) => {

router.put("/:id", [verifyToken], (async (req, res) => {

router.put("/:id", [verifyPermission(LibraryRoles.ADMIN)], (async (req, res) => {

# Only the user with this ID can update his row 
router.put("/:id", [equalField("id")], (async (req, res) => {

```
