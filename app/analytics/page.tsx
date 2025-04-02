'use client';

import React, { useState, useEffect } from 'react';
import { getDevices, getDevice, updateProperty } from '@/lib/arduinoInit';

// Define your images object with index signature to handle dynamic keys
const images: { [key: string]: string } = {
  pump: '/images/pump.png',
  valve: '/images/valve.png',
  // Add other component images as needed
};

interface Component {
  id: string;
  name: string;
  type: string;
  isOn: boolean;
  counter: number;
  imageUrl: string;
}

interface System {
  id: number;
  name: string;
  components: Component[];
}

const AnalyticsPage = () => {
  const [systems, setSystems] = useState<System[]>([]);
  const [newSystemName, setNewSystemName] = useState('');
  const [newComponentName, setNewComponentName] = useState('');
  const [newComponentType, setNewComponentType] = useState('');
  const [selectedSystemId, setSelectedSystemId] = useState<number | null>(null);

  // Fetch devices (components) from the Arduino API and add to state
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDevices(); // This will return a list of devices
        const newSystems = devices.map((device) => ({
          id: Date.now(), // Temporary ID for the system (can be adjusted)
          name: `System ${device.name}`,
          components: [
            {
              id: device.id,
              name: device.name,
              type: device.type,
              isOn: false, // We assume components are off by default
              counter: 0, // You can fetch this from the API if available
              imageUrl: images[device.type] || '/images/default.png', // Get the image based on component type
            },
          ],
        }));

        setSystems(newSystems);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  // Fetch token from the server-side API route
  const fetchToken = async () => {
    try {
      const response = await fetch('/api/arduinoToken');
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const handleToggleComponent = async (systemId: number, componentId: string) => {
    // Create a copy of the systems array
    const updatedSystems = await Promise.all(
      systems.map(async (system) => {
        if (system.id === systemId) {
          const updatedComponents = await Promise.all(
            system.components.map(async (component) => {
              if (component.id === componentId) {
                const newState = !component.isOn;
                // Fetch token and update the component state in Arduino API
                const token = await fetchToken();
                if (token) {
                  updateProperty(componentId, 'state', newState, token); // Adjust API call if needed
                }
                return { ...component, isOn: newState };
              }
              return component;
            })
          );
          return { ...system, components: updatedComponents };
        }
        return system;
      })
    );

    setSystems(updatedSystems); // Update state with the new systems array
  };

  // Increment component counter
  const handleIncrementCounter = (systemId: number, componentId: string) => {
    const updatedSystems = systems.map((system) => {
      if (system.id === systemId) {
        const updatedComponents = system.components.map((component) => {
          if (component.id === componentId) {
            return { ...component, counter: component.counter + 1 };
          }
          return component;
        });
        return { ...system, components: updatedComponents };
      }
      return system;
    });
    setSystems(updatedSystems);
  };

  // Handle creating a new system
  const handleCreateSystem = () => {
    if (newSystemName === '') return;

    const newSystem = {
      id: Date.now(),
      name: newSystemName,
      components: [],
    };

    setSystems([...systems, newSystem]);
    setNewSystemName('');
  };

  // Handle adding a new component
  const handleAddComponent = () => {
    if (newComponentName === '' || newComponentType === '') return; // Don't add if fields are empty

    const newComponent = {
      id: Date.now().toString(),
      name: newComponentName,
      type: newComponentType,
      isOn: false,
      counter: 0,
      imageUrl: images[newComponentType] || '/images/default.png',
    };

    // Find the selected system and add the new component
    const updatedSystems = systems.map((system) => {
      if (system.id === selectedSystemId) {
        return { ...system, components: [...system.components, newComponent] };
      }
      return system;
    });

    setSystems(updatedSystems); // Update systems with new component
    setNewComponentName(''); // Clear input after adding component
    setNewComponentType(''); // Clear input after adding component
  };

  return (
    <div className="container">
      <h1>SCADA Dashboard</h1>
      {/* Create a new system */}
      <div>
        <h2>Create New System</h2>
        <input
          type="text"
          value={newSystemName}
          onChange={(e) => setNewSystemName(e.target.value)}
          placeholder="System Name"
        />
        <button onClick={handleCreateSystem}>Create System</button>
      </div>

      {/* Display systems */}
      <div>
        <h2>Systems</h2>
        <ul>
          {systems.map((system) => (
            <li key={system.id}>
              <button onClick={() => setSelectedSystemId(system.id)}>
                {system.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* If a system is selected, show components form */}
      {selectedSystemId && (
        <div>
          <h3>Add Component to System</h3>
          <input
            type="text"
            value={newComponentName}
            onChange={(e) => setNewComponentName(e.target.value)}
            placeholder="Component Name"
          />
          <input
            type="text"
            value={newComponentType}
            onChange={(e) => setNewComponentType(e.target.value)}
            placeholder="Component Type"
          />
          <button onClick={handleAddComponent}>Add Component</button>

          <h4>Components in this system:</h4>
          <ul>
            {systems
              .find((system) => system.id === selectedSystemId)
              ?.components.map((component) => (
                <li key={component.id} className="component-item">
                  <div>
                    <img src={component.imageUrl} alt={component.name} width={100} />
                    <h5>{component.name}</h5>
                    <p>Type: {component.type}</p>
                    <p>Status: {component.isOn ? 'On' : 'Off'}</p>
                    <p>Counter: {component.counter}</p>
                  </div>

                  <button
                    onClick={() =>
                      handleToggleComponent(selectedSystemId, component.id)
                    }
                  >
                    {component.isOn ? 'Turn Off' : 'Turn On'}
                  </button>

                  <button
                    onClick={() =>
                      handleIncrementCounter(selectedSystemId, component.id)
                    }
                  >
                    Increment Counter
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;