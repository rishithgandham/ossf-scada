

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import tam_agrilife from '@/images/tamu_agrilife_logo.png'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"


import { Activity, AlertCircle, BarChart3, CircuitBoard, ClipboardList, LayoutDashboard, LogOut, Settings } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';



export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SidebarProvider>

                {/* sidebar */}
                <AppSidebar />

                {/* main content */}
                <div className='flex-1'>

                    <Navbar />
                    {children}
                </div>

            </SidebarProvider >
        </div>

    );
}

function Navbar() {
    return (
        <div className="flex border-b-[1px] justify-between  w-full h-12 items-center px-4">
            <SidebarTrigger />
            {/* <Image src={tam_agrilife} alt="TAMU AgriLife Logo" className={cn('w-24' )} /> */}
            <div className="ml-auto flex items-center space-x-4">
                <UserNav />
            </div>
        </div>
    )
}


export function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>TA</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Administrator</p>
                        <p className="text-xs leading-none text-muted-foreground">admin@tamu.edu</p>
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
                <DropdownMenuItem className="text-red-600">
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AppSidebar() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar className="border-r border-border bg-card hidden md:block">
                <SidebarHeader className="p-4">
                    <div className="flex items-center gap-2">
                        {/* <div className="font-serif text-2xl font-bold tracking-tight text-tama">TAMA SCADA</div> */}
                        <Image src={tam_agrilife} alt="TAMU AgriLife Logo" className='w-full' />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Overview</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Dashboard</span>
                                        <LayoutDashboard className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Monitoring</span>
                                        <Activity className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Analytics</span>
                                        <BarChart3 className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <hr />
                    <SidebarGroup>
                        <SidebarGroupLabel>Management</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Sensors</span>
                                        <CircuitBoard className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Reports</span>
                                        <ClipboardList className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Alerts</span>
                                        <AlertCircle className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className='pb-5'>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className='flex justify-between font-semibold text-sm' >
                                        <span>Settings</span>
                                        <Settings className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className=' text-destructive flex justify-between font-semibold text-sm' >
                                        <span>Logout</span>
                                        <LogOut className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarUser />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>

            {/* <div className="flex-1 mb-10">
                <header className="border-b border-border">
                    <div className="flex h-16 items-center px-4">
                        <div className="ml-auto flex items-center space-x-4">
                        </div>
                    </div>
                </header>
            </div> */}
        </div>
    )
}


// function Sidebar() {
//     return (
//         <Sheet>
//             <SheetTitle>

//             </SheetTitle>
//             <SheetTrigger asChild>
//                 <Button variant="ghost" size="sm" className="">
//                     <MenuIcon className="w-3 h-3" />
//                     <span className="sr-only">Menu</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent
//                 side="left"
//                 className="flex justify-between flex-col w-72 border-border backdrop-blur"
//             >
//                 <nav className="flex-1 space-y-1 text-lg font-medium">
//                     {/* <Link href="/" legacyBehavior passHref>
//                         <NavigationMenuLink className="pl-3 text-2xl font-bold tracking-tight">
//                             tasX
//                         </NavigationMenuLink>
//                     </Link>
//                     {navLinks.map((link, i) => (
//                         <Link
//                             href={link.href}
//                             key={link.href}
//                             className="w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted text-muted-foreground hover:text-foreground"
//                         >
//                             <NavigationMenuLink className="text-sm ">
//                                 {link.name}
//                             </NavigationMenuLink>
//                             {link.icon}
//                         </Link>
//                     ))} */}
//                 </nav>
//                 <div className="">
//                     <div className="flex justify-start space-x-0 pl-1">
//                         <Button variant="ghost" size="sm" className=" ">
//                             <Bell className="h-3 w-3" />
//                             <span className="sr-only">Notifications</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" className=" ">
//                             <Bell className="h-3 w-3" />
//                             <span className="sr-only">Notifications</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" className=" ">
//                             <Bell className="h-3 w-3" />
//                             <span className="sr-only">Notifications</span>
//                         </Button>

//                     </div>
//                     {/* {userLinks.map((link, i) => {
//                         return link.action ? (
//                             <form action={link.action} key={link.href}>
//                                 <button
//                                     type="submit"
//                                     className={`w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted ${link.color == 'destructive'
//                                             ? 'text-destructive hover:font-bold'
//                                             : 'text-muted-foreground hover:text-foreground'
//                                         } `}
//                                 >
//                                     <p className="text-sm ">{link.name}</p>
//                                     {link.icon}
//                                 </button>
//                             </form>
//                         ) : (
//                             <Link
//                                 href={link.href}
//                                 key={link.href}
//                                 passHref
//                                 className={`w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted ${link.color == 'destructive'
//                                         ? 'text-destructive hover:font-bold'
//                                         : 'text-muted-foreground hover:text-foreground'
//                                     } `}
//                             >
//                                 <NavigationMenuLink className="text-sm ">
//                                     {link.name}
//                                 </NavigationMenuLink>
//                                 {link.icon}
//                             </Link>
//                         );
//                     })} */}
//                     <hr className="mt-5" />
//                     <SidebarUser />
//                 </div>
//             </SheetContent>
//             <SheetFooter></SheetFooter>
//         </Sheet>
//     );
// }

function SidebarUser() {
    return (
        <div className="flex mt-5 items-center  space-x-2 px-2">
            {/* <Avatar className="">
                <AvatarImage className="" src={'lll'} />
                <AvatarFallback className="">RG</AvatarFallback>
            </Avatar> */}

            <div className="text-left">
                <p className="text-xs font-medium ">Rishith Gandham</p>
                <p className="text-xs text-muted-foreground">rishith.gandham@gmail.com</p>
            </div>
        </div>
    );
}