'use client';

import { Avatar, AvatarFallback } from "../ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuIcon } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { DropdownMenuShortcut } from "../ui/dropdown-menu"
import { SidebarTrigger } from "../ui/sidebar"
import { handleLogout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import { User } from "@/db/schema";

export default function AppNavbar({ user }: { user: User }) {
    return (
        <div className="flex border-b-[1px] justify-between  w-full h-12 items-center px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
                <UserNav user={user} />
            </div>
        </div>
    )
}


function UserNav({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <button onClick={handleLogout} className="w-full">
                    <DropdownMenuItem className="text-red-600">
                        Log out
                        <DropdownMenuIcon><LogOut /></DropdownMenuIcon>
                    </DropdownMenuItem>
                </button>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

