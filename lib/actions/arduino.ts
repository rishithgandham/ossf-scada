"use server";

import { getDevices, getDevice, getThing } from "@/lib/arduinoInit";

// Server action to fetch all devices
export async function fetchDevices() {
  try {
    const devices = await getDevices();
    return { success: true, data: devices };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Server action to fetch a specific device by ID
export async function fetchDevice(deviceId: string) {
  try {
    const device = await getDevice(deviceId);
    return { success: true, data: device };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Server action to fetch a specific thing by ID
export async function fetchThing(thingId: string) {
  try {
    const thing = await getThing(thingId);
    return { success: true, data: thing };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
