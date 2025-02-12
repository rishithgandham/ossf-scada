'use client';
import { redirect } from 'next/navigation'
import React from 'react'
import { Input } from '@/lib/components/ui/input'
import { Button } from '@/lib/components/ui/button'
import { handleLogin } from '@/lib/actions/auth';

export default function LoginForm() {

    return (
        <>

            <form className="mt-8 space-y-6" action={handleLogin}>
                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input type="email" placeholder="Enter your email address" id="email" className="w-full" />
                    <p className="text-xs text-gray-500">This email will not be shared</p>
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <Input type="password" placeholder="Enter your password" id="password" className="w-full" />

                    <p className="text-xs text-gray-500">Minimum 6 characters</p>
                </div>

                <Button type="submit" variant={'default'} className="w-full hover:bg-tama-secondary bg-tama text-white py-2">
                    Log In
                </Button>
            </form>

        </>
    )
}
