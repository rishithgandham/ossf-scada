"use client"

import type React from "react"

import { useActionState, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { createUser } from "@/app/actions/admin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserFormSchema } from "@/forms/createUser"
import { Form, FormMessage, FormControl, FormLabel, FormField, FormItem, FormDescription } from "../ui/form"

const initialState = {
    errors: {
        email: [],
        password: [],
        name: [],
    },
    message: ''
}

export function AddUserForm() {

    const form = useForm({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }

    })

    const formRef = useRef<HTMLFormElement>(null);
    const [state, action, pending] = useActionState(createUser, initialState);

    return (
        <Form  {...form}>


            <form ref={formRef} onSubmit={() => formRef.current?.requestSubmit()} action={action} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage> {state?.errors?.name} </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="user@tamu.org" {...field} />
                            </FormControl>
                            <FormMessage> {state?.errors?.email} </FormMessage>
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
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage> {state?.errors?.password} </FormMessage>
                        </FormItem>
                    )}
                />




                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                        <FormLabel>Send Email Invitation</FormLabel>
                        <FormDescription>An email will be sent to the user with login instructions</FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={true} onCheckedChange={() => { }} />
                    </FormControl>
                </FormItem>

                <Button type="submit" className="w-full bg-tama hover:bg-tama/80" disabled={pending}>
                    {pending ? "Adding User..." : "Add User"}
                </Button>
            </form>

        </Form>

    )
}
