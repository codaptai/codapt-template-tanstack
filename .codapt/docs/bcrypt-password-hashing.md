We can use the bcrypt library to hash and verify passwords.

```
import bcrypt from "bcrypt";

// hash a password
const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

// verify a password
const result = await bcrypt.compare(myPlaintextPassword, hashedPassword);

if (result) {
  // the password is correct!
} else {
  // the password is incorrect
}
```
