import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/dal";
import { Activity, AlertCircle, CircuitBoard, Signal } from "lucide-react"

import React from 'react'

export default async function Page() {


    return (
        <>
            <main className=' w-full h-full flex justify-center items-center  '>
                <div className="container h-full p-10 ">
                    <div className=" tracking-tight font-bold">
                        <p className="text-4xl text-tama font-serif">Dashboard</p>
                        <p className="text-sm font-semibold text-muted-foreground">Welcome to the TAMU OSSF Center SCADA System</p>
                        {/* <p className="text-sm font-semibold text-muted-foreground">Authenticated: {email}</p> */}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                        <Card >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active PLC Devices</CardTitle>
                                <CircuitBoard className="h-4 w-4 text-maroon" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">24</div>
                                <p className="text-xs text-muted-foreground">+2 from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                                <Activity className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Operational</div>
                                <p className="text-xs text-muted-foreground">All systems normal</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2</div>
                                <p className="text-xs text-muted-foreground">Requires attention</p>
                            </CardContent>
                        </Card>
                        
                    </div>
                </div>

            </main>
        </>
    )
}
