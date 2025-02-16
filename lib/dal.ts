import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { redirect } from 'next/navigation';

export type User = {
  email: string;
  name: string;
  password: string;
};

export const ALLOWED_USERS: User[] = [
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

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);
  return {
    payload,
  };
}

export async function verifyAuth() {
  const { payload } = await getSession();
  if (!payload.sub) return redirect('/login');

  // check if user exists
  const user = ALLOWED_USERS.find(user => user.email === payload.sub);
  if (!user) return redirect('/login');

  return {
    user: user,
    authenticated: true,
  };
}
