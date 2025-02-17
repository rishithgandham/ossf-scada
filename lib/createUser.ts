// import { UserInsert, UserSelect, usersTable } from "@/db/schema";
// import { hash } from "crypto";
// import bcrypt from "bcrypt";

// // get drizzle instance
// import { db } from "@/db";


// function createUser() {
//   ALLOWED_USERS.forEach(async (user) => {
//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(user.password, salt);

//     await db.insert(usersTable).values({
//       email: user.email,
//       hashedPassword: hashed,
//       name: user.name,
//     })

//   })
// }

// createUser();