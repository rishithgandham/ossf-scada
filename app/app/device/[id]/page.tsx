import { ArrowLeft, Activity, Clock, MapPin, AlertTriangle, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDevice, getThing } from "@/lib/arduinoInit"
import { Params } from "next/dist/server/request/params"

export default async function SystemDetail({ params }: {
    params: Params
}) {

    const { slug } = await params;


    const device = await getDevice(slug?.[0] ?? "");

    console.log(device.thing)

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
                <Link href="/app/">
                    <Button variant="outline" size="sm" className="mr-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-[#6B1D23]">{device.name}</h1>
                <Badge className="ml-4 bg-green-100 text-green-800">Online</Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>PLC Information</CardTitle>
                        <CardDescription>Basic information about this PLC device</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">PLC ID</dt>
                                <dd className="text-sm font-semibold">{device.id}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Model</dt>
                                <dd className="text-sm font-semibold">{device.type}</dd>
                            </div>


                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                                <dd className="text-sm font-semibold flex items-center">
                                    <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                    OSSF SCADA FACILITY
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Last Active</dt>
                                <dd className="text-sm font-semibold flex items-center">
                                    <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                    {new Date(device.last_activity_at!).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>Maintenance schedule and history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-1 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                                <dd className="text-sm font-semibold text-green-600 flex items-center">
                                    <Activity className="mr-1 h-3.5 w-3.5" />
                                    {device.device_status == "ONLINE" ? "Online" : "Offline"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Serial Number</dt>
                                <dd className="text-sm font-semibold flex items-center">
                                    {device.serial}
                                </dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>



            </div>

            {/* show plc things */}
            <Card className="mb-8 mt-10">
                <CardHeader>
                    <div className="flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
                        <CardTitle>Arduino Properties</CardTitle>
                    </div>
                    <CardDescription>Connected IoT device properties and their current values</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        {device.thing?.properties?.map((property) => (
                            <Card key={property.id} className="border-muted">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">{property.name}</CardTitle>
                                        <Badge
                                            className={
                                                property.permission === "READ_ONLY"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                            }
                                        >
                                            {property.permission}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        Type: {property.type} • Update: {property.update_strategy}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Value</h4>
                                            <div className="text-xl font-semibold">
                                                {property.type === "STATUS" ? (property.last_value ? "True" : "False") : property.last_value}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Last updated: {new Date(property.value_updated_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Property Details</h4>
                                            <dl className="grid grid-cols-2 gap-1 text-sm">
                                                <dt className="text-muted-foreground">Variable:</dt>
                                                <dd>{property.variable_name}</dd>
                                                <dt className="text-muted-foreground">Tag:</dt>
                                                <dd>{property.tag}</dd>
                                                <dt className="text-muted-foreground">Persist:</dt>
                                                <dd>{property.persist ? "Yes" : "No"}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>



        </div>
    )
}

