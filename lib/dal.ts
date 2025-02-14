import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { redirect } from 'next/navigation';

export async function auth() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);
  
  if (!payload.sub) {
    redirect('/login');
  }

  return {
    authenticated: true,
    email: payload.sub
  } 
}
