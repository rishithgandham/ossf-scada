'use server';
import { loginFormSchema } from '@/forms/login';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '../session';
import { verifyAuth } from '../dal';
import { db } from '@/db';
import { verifyPassword } from '../password';

export async function getUser() {
  const { user } = await verifyAuth();
  return user;
}

export async function handleLogout() {
  deleteSession();
  redirect('/login');
}

export async function handleLogin(formData: FormData) {
  // validate form data
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid Form Data',
    };
  }

  // find user and check if they exist
  const user = await db.query.usersTable.findFirst({
    where: (usersTable, { eq }) =>
      eq(usersTable.email, validatedFields.data.email),
  });
  const exists = !!user;
  if (!exists) {
    return {
      errors: {
        email: ['Invalid Credentials'],
        password: ['Invalid Credentials'],
      },
      message: 'User does not exist',
    };
  }

  // check if passwords match
  const match = await verifyPassword(
    validatedFields.data.password,
    user.hashedPassword
  );
  if (!match) {
    return {
      errors: {
        email: [],
        password: ['Invalid Credentials'],
      },
      message: 'Invalid Credentials',
    };
  }

  // create session
  try {
    const session = await createSession(user.email);
    console.log(session);
  } catch (error) {
    return {
      errors: {
        email: [],
        password: [],
      },
      message: 'An unexpected error occurred',
    };
  }
  redirect('/app');
}
