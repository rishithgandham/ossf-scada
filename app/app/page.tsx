import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, AlertCircle, CheckCircle, CircuitBoard, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getDevices } from "@/lib/arduinoInit"

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

                    <PLCTable />
                </div>

            </main>
        </>
    )
}

async function PLCTable() {
    const devices = await getDevices();

    const formatTime = (iso: string) => {
        const date = new Date(iso)
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-10">
                <h2 className="text-2xl font-bold text-tama font-serif mb-4 sm:mb-0">Active Systems</h2>

            </div>

            <div className="rounded-md ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>PLC ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell className="font-medium">{device.id}</TableCell>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>
                                    {device.device_status == "ONLINE" ? (
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                                            Online
                                        </Badge>
                                    ) :
                                        !device.ota_available && (
                                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                                                Warning
                                            </Badge>
                                        )}

                                </TableCell>
                                <TableCell className="hidden md:table-cell">{formatTime(device.last_activity_at!)}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/app/device/${device.id}`}>
                                        <Button variant="outline" size="sm">
                                            Details
                                            <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption>Showing {devices.length} PLCs</TableCaption>
                </Table>
            </div>

        </>
    )
}

