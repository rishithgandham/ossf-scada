'use client';
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
import Image from "next/image";
import tam_agrilife from '@/images/tamu_agrilife_logo.png';
import { handleLogout } from "@/lib/actions/auth";
import { User } from "@/db/schema";
import { useRouter } from 'next/navigation'; 

export default function AppSidebar({ user }: { user: User }) {

    const router = useRouter();  // <-- Initialize useRouter hook to manage navigation

    const redirectToAnalytics = () => {
        router.push('/analytics');  // <-- Redirects to the '/analytics' page
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar className="border-r border-border bg-card hidden md:block">
                <SidebarHeader className="p-4 py-8">
                    <div className="flex items-center gap-2">
                        <Image src={tam_agrilife} alt="TAMU AgriLife Logo" className='w-full' />
                    </div>
                </SidebarHeader>
                <SidebarContent >
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
                                    <SidebarMenuButton onClick={redirectToAnalytics} className='flex justify-between font-semibold text-sm' >
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
                                    <SidebarMenuButton onClick={handleLogout} className=' text-destructive flex justify-between font-semibold text-sm' >
                                        <span>Logout</span>
                                        <LogOut className="h-4 w-4" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarUser user={user} />
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

function SidebarUser({ user }: { user: User }) {
    return (
        <div className="flex mt-5 items-center  space-x-2 px-2">
            {/* <Avatar className="">
                <AvatarImage className="" src={'lll'} />
                <AvatarFallback className="">RG</AvatarFallback>
            </Avatar> */}

            <div className="text-left">
                <p className="text-xs font-medium ">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
        </div>
    );
}