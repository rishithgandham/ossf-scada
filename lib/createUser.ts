// import { UserInsert, User, usersTable } from "@/db/schema";
// import { hash } from "crypto";
// import bcrypt from "bcrypt";

// // get drizzle instance
// import { db } from "@/db";

import { db } from '@/db';
import { hashPassword } from './password';
import { usersTable } from '@/db/schema';

async function createUsers() {
    // Delete all existing users
    await db.delete(usersTable);
    console.log('Deleted all existing users');

    // Create admin user
    const adminPassword = await hashPassword('admins');
    await db.insert(usersTable).values({
        name: 'Admin User',
        email: 'admin@tama.org',
        hashedPassword: adminPassword,
        isAdmin: true,
    });

    // Create student user
    const studentPassword = await hashPassword('students');
    await db.insert(usersTable).values({
        name: 'Student User',
        email: 'student@tama.org',
        hashedPassword: studentPassword,
        isAdmin: false,
    });

    console.log('Users created successfully!');
}

createUsers().catch(console.error);