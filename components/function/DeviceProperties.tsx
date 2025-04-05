"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { fetchThing } from "@/lib/actions/arduino";

interface DevicePropertiesProps {
    thingId: string;
    initialProperties: any[];
}

export function DeviceProperties({ thingId, initialProperties }: DevicePropertiesProps) {
    const [properties, setProperties] = useState(initialProperties);

    // Function to fetch all properties for the device
    const refreshProperties = async () => {
        try {
            const result = await fetchThing(thingId);
            if (result.success && result.data?.properties) {
                setProperties(result.data.properties);
            }
        } catch (error) {
            console.error("Failed to fetch device properties:", error);
        }
    };

    // Set up polling at the device level
    useEffect(() => {
        refreshProperties(); // Initial fetch
        const interval = setInterval(refreshProperties, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [thingId]);

    return (
        <div className="grid gap-6">
            {properties.map((property: any) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    thingId={thingId}
                    onUpdate={refreshProperties}
                />
            ))}
        </div>
    );
} 