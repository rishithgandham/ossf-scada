'use server';
import { loginFormSchema } from '@/forms/login';
import { redirect } from 'next/navigation';
import { createSession, encrypt } from '../session';
import Error from 'next/error';
import { cookies } from 'next/headers';
import { auth } from '../dal';

const ALLOWED_USERS = [
  {
    email: 'admin@tama.com',
    name: 'Admin',
    password: 'admins',
  },
  {
    email: 'student@tama.com',
    name: 'Rishith',
    password: 'student_password',
  },
];


export async function getUser() {
  // check session validity
  const { authenticated, email } = await auth()
  return ALLOWED_USERS.find(user => user.email === email);

}

export async function handleLogout() {
  // destroy session cookie
  (await cookies()).delete('session');
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

  // find user and create session if passwords match, redirect to app
  const user = ALLOWED_USERS.find(
    user =>
      user.email === validatedFields.data.email &&
      user.password === validatedFields.data.password
  );
  if (!user) {
    return {
      errors: {
        email: ['Invalid Credentials'],
        password: ['Invalid Credentials'],
      },
      message: 'Invalid Credentials',
    };
  }
  try {
    const session = await createSession(user.email);
    console.log(session);
  } catch (error) {
    return {
      errors: {
        email: [],
        password: [],
      },
      message: error,
    };
  }
  redirect('/app');
}
