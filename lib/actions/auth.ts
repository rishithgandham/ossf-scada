'use server';
import { redirect } from 'next/navigation';

export async function handleLogin() {
  // handle login, through firebase or any other auth provider

  // redirect to dashboard if successful
  redirect('/app');
}
