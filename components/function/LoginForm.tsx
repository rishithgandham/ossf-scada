'use client';
import { redirect } from 'next/navigation'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { handleLogin } from '@/lib/actions/auth';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormSchemaType } from '@/forms/login';



export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function handleSubmit(values: LoginFormSchemaType) {
        // CONVERT TO FORM DATA
        const formData = new FormData()
        formData.append('email', values.email)
        formData.append('password', values.password)
        const response = await handleLogin(formData)

        if (response) {
            Object.entries(response.errors).forEach(([field, errors]) => {
                form.setError(field as keyof typeof loginFormSchema.shape, {
                    type: 'manual',
                    message: errors?.[0] || ''
                })
            })
        }

        // toast message
        if (response?.message) alert(response.message)


    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email adress" {...field} />
                                </FormControl>
                                <div className='flex gap-2'>
                                    <FormDescription>
                                        Your email will not be shared
                                    </FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter your password" {...field} />
                                </FormControl>
                                <div className='flex gap-2'>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={'default'} className="w-full hover:bg-tama-secondary bg-tama text-white py-2 mt-10 ">
                        Log In
                    </Button>

                </form>
            </Form >


        </>
    )
}
