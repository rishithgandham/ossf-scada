"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { updateDeviceProperty, fetchPropertyValue } from "@/lib/actions/arduino";
import { useRouter } from "next/navigation";

interface ArduinoProperty {
    id: string;
    name: string;
    type: string;
    permission: "READ_ONLY" | "READ_WRITE";
    update_strategy: string;
    variable_name: string;
    tag: string;
    persist: boolean;
    last_value: any;
    value_updated_at: string;
}

interface PropertyCardProps {
    property: ArduinoProperty;
    thingId: string;
}

export function PropertyCard({ property, thingId }: PropertyCardProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [currentValue, setCurrentValue] = useState(property.last_value);
    const [lastUpdateTime, setLastUpdateTime] = useState(property.value_updated_at);

    // Function to fetch the latest property value
    const refreshValue = useCallback(async () => {
        const result = await fetchPropertyValue(thingId, property.id);
        if (result.success && result.data) {
            setCurrentValue(result.data.value);
            setLastUpdateTime(result.data.updated_at);
        }
    }, [thingId, property.id]);

    // Set up polling for all properties
    useEffect(() => {
        refreshValue(); // Initial fetch
        const interval = setInterval(refreshValue, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [refreshValue]);

    // Update local state when property changes from parent
    useEffect(() => {
        setCurrentValue(property.last_value);
        setLastUpdateTime(property.value_updated_at);
    }, [property.last_value, property.value_updated_at]);

    const handlePropertyUpdate = async (value: any) => {
        if (value === currentValue) return; // Prevent unnecessary updates

        startTransition(async () => {
            try {
                const result = await updateDeviceProperty(thingId, property.id, value);
                if (result.success) {
                    setCurrentValue(value);
                    setLastUpdateTime(new Date().toISOString());
                    router.refresh();
                    // Fetch the latest value after a short delay to ensure we get the updated value
                    setTimeout(refreshValue, 1000);
                }
            } catch (error) {
                console.error("Failed to update property:", error);
                // Revert to previous value on error
                setCurrentValue(property.last_value);
            }
        });
    };

    return (
        <Card className="border-muted">
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
                            {property.type === "STATUS" ? (currentValue ? "True" : "False") : currentValue}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Last updated: {new Date(lastUpdateTime).toLocaleString()}
                        </p>
                        {property.permission === "READ_WRITE" && (
                            <div className="mt-4">
                                {property.type === "STATUS" ? (
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={!!currentValue}
                                            disabled={isPending}
                                            onCheckedChange={handlePropertyUpdate}
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {currentValue ? "On" : "Off"}
                                        </span>
                                    </div>
                                ) : (
                                    <Input
                                        type="text"
                                        value={currentValue ?? ""}
                                        className="w-full"
                                        disabled={isPending}
                                        onChange={(e) => setCurrentValue(e.target.value)}
                                        onBlur={(e) => handlePropertyUpdate(e.target.value)}
                                    />
                                )}
                                {isPending && (
                                    <p className="text-xs text-muted-foreground mt-1">Updating...</p>
                                )}
                            </div>
                        )}
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
    );
} 