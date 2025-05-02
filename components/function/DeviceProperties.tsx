"use client";

// Import required components and hooks
import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { fetchThing } from "@/lib/actions/arduino";

// Props interface for DeviceProperties component
interface DevicePropertiesProps {
    thingId: string;
    initialProperties: any[];
}

// DeviceProperties component that displays and manages device properties
export function DeviceProperties({ thingId, initialProperties }: DevicePropertiesProps) {
    // State for storing device properties
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

    // Set up polling to refresh properties every 5 seconds
    useEffect(() => {
        refreshProperties(); // Initial fetch
        const interval = setInterval(refreshProperties, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [thingId]);

    return (
        <div className="grid gap-6">
            {/* Map through properties and render PropertyCard for each */}
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