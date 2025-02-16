'use server';
import { loginFormSchema } from '@/forms/login';
import { redirect } from 'next/navigation';
import { createSession, deleteSession, encrypt } from '../session';
import Error from 'next/error';
import { cookies } from 'next/headers';
import { ALLOWED_USERS, verifyAuth } from '../dal';




export async function getUser() {
  const { user } = await verifyAuth();
  return user

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
