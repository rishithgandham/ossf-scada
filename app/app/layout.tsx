

import tam_agrilife from '@/images/tamu_agrilife_logo.png'




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
import AppSidebar from '@/components/function/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppNavbar from '@/components/function/AppNavbar';



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

                    <AppNavbar />
                    {children}
                </div>

            </SidebarProvider >
        </div>

    );
}




