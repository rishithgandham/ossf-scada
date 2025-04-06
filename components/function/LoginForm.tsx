'use client';
import { redirect } from 'next/navigation'
import React, { useActionState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { handleLogin } from '@/lib/actions/auth';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormSchemaType } from '@/forms/login';
import { useToast } from '@/hooks/use-toast';

const initialState = {
    errors: {
        email: [],
        password: []
    },
    message: ''
}

export default function LoginForm() {
    const { toast } = useToast();

    const [state, action, pending] = useActionState(handleLogin, initialState);
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const formRef = useRef<HTMLFormElement>(null);

    // Show toast for error message
    React.useEffect(() => {
        if (state?.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <>
            <Form {...form}>
                <form ref={formRef}
                    action={action}
                    onSubmit={() => formRef.current?.requestSubmit()}>

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
                                    <FormMessage>
                                        {state?.errors?.email?.[0]}
                                    </FormMessage>
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
                                    <FormMessage>
                                        {state?.errors?.password?.[0]}
                                    </FormMessage>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        variant={'default'} 
                        className="w-full hover:bg-tama-secondary bg-tama text-white py-2 mt-10"
                        disabled={pending}
                    >
                        {pending ? 'Logging in...' : 'Log In'}
                    </Button>

                </form>
            </Form>
        </>
    )
}
