"use server"

import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { hash } from "bcrypt"
import { createUserFormSchema } from "@/forms/createUser"
import { verifyAuth } from "@/lib/dal"
import { getUser } from "@/lib/actions/auth"

export async function getUsers() {
  const users = await db.select().from(usersTable)
  return users
}


type CreateUserError = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  }
  message: string;
}

export async function createUser(prevState: any, formData: FormData): Promise<CreateUserError> {
  // check if the user is an admin
  const user = await getUser();
  if (!user?.isAdmin) {
    return {
      errors: {
        name: [""],
        email: [""],
        password: [""],
      },
      message: "You are not authorized to create a user"
    }
  }
  const validatedFields = createUserFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    isAdmin: formData.get("isAdmin"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    }
  }

  try {
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await hash(password, 10);
    await db.insert(usersTable).values({
      name,
      email,
      hashedPassword,
      isAdmin: false,
    })
  } catch (error) {
    return {
      errors: {
        name: [""],
      },
      message: "Error creating user",
    }
  }
 

  revalidatePath("/app/user_management")
  redirect("/app/user_management")
}

export async function updateUser(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const isAdmin = formData.get("isAdmin") === "on"

  if (!id || !name || !email) {
    throw new Error("Missing required fields")
  }

  await db
    .update(usersTable)
    .set({
      name,
      email,
      isAdmin,
    })
    .where(eq(usersTable.id, id))

  revalidatePath("/user_management")
  redirect("/user_management")
}

export async function deleteUser(id: number) {

  if (!id) {
    throw new Error("Missing user ID")
  }

  await db.delete(usersTable).where(eq(usersTable.id, id))

  revalidatePath("/app/user_management")
  redirect("/app/user_management")
} 