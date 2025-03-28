# REACT Native Mobile: API and Location Services Reference Guide

## Table of Contents
1. [API Integration Fundamentals](#api-integration-fundamentals)
2. [Object Destructuring in React Native](#object-destructuring)
3. [Location Services](#location-services)
4. [Maps Integration](#maps-integration)
5. [Best Practices](#best-practices)

## API Integration Fundamentals <a name="api-integration-fundamentals"></a>

### Basic API Structure
Source: `apps/w08-api/App-api-demo.js` (lines 8-40)
```javascript
const getData = async () => {
    try {
        // 1. Connect to API endpoint
        const response = await fetch('https://api-endpoint.com');
        
        // 2. Check response status
        if (response.ok) {
            // 3. Convert to JavaScript data structure
            const data = await response.json();
            
            // 4. Use the data
            console.log(data);
        } else {
            console.log("ERROR:", response.status);
        }
    } catch (err) {
        console.log(err);
    }
};
```

### State Management for API Data
Source: `apps/w08-api/App-s_s-api.js` (lines 7-13, 15-17)
```javascript
// 1. Import required hooks
import { useState, useEffect } from 'react';

// 2. Create state variables
const [apiData, setApiData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

// 3. Fetch data when component mounts
useEffect(() => {
    getData();
}, []);
```

### Loading States
Source: `apps/w08-api/App-s_s-api.js` (lines 29-42)
```javascript
return (
    <View style={styles.container}>
        {isLoading ? (
            <Text>Loading...</Text>
        ) : (
            <FlatList
                data={apiData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Text>{item.name}</Text>
                )}
            />
        )}
    </View>
);
```

## Object Destructuring <a name="object-destructuring"></a>
Source: `apps/w08-api/App-destructing-objs.js` (lines 11-53)

### Basic Destructuring
```javascript
// Object with nested properties
const student = {
    name: "Peter",
    age: 51,
    email: "peter@gmail.com",
    favCourse: {
        code: "BTI425",
        coursename: "Web Programming #3"
    }
};

// Modern destructuring syntax
const { name, age, email, favCourse } = student;
```

## Location Services <a name="location-services"></a>
Source: `notes/wk09-Geocoding.md` (lines 42-89)

### Permission Handling
Source: `apps/w09-geo/App.js` (lines 31-45)
```javascript
const requestPermissions = async () => {
    try {
        const permissionsObject = await Location.requestForegroundPermissionsAsync();
        if (permissionsObject.status === "granted") {
            alert("Permission granted!");
        } else {
            alert("Permission denied");
        }
    } catch (err) {
        console.log(err);
    }
};
```

### Geocoding Functions
Source: `apps/w09-geo/App.js` (lines 47-98)
```javascript
// Forward Geocoding
const doFwdGeocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(addressFromUI);
    // Implementation details...
};

// Reverse Geocoding
const doReverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        latitude: parseFloat(latFromUI),
        longitude: parseFloat(lngFromUI)
    });
    // Implementation details...
};
```

## Maps Integration <a name="maps-integration"></a>
Source: `apps/w09-maps/App.js` (lines 11-63)

### Map Configuration
Source: `apps/w09-maps/App.js` (lines 12-21)
```javascript
const [visibleMapRegion, setVisibleMapRegion] = useState({
    latitude: 43.7949433,
    longitude: -79.3529767,
    latitudeDelta: 1,    // Zoom level
    longitudeDelta: 1    // Zoom level
});
```

### Programmatic Map Control
Source: `apps/w09-map-demo/App.js` (lines 71-82)
```javascript
const moveMapSomewhere = () => {
    mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: newLng,
        latitudeDelta: 1,
        longitudeDelta: 1
    });
};
```

### Custom Markers
Source: `apps/w09-maps/App.js` (lines 64-73)
```javascript
<Marker coordinate={coordinates}>
    <View style={styles.customMarker}>
        <Text>Custom Marker</Text>
        <FontAwesome6 name="house-chimney" size={24} color="black"/>
    </View>
</Marker>
```

## Best Practices <a name="best-practices"></a>
Source: Combined from multiple files and `notes/wk08-APIs.md` (lines 89-120) and `notes/wk09-Geocoding.md` (lines 156-189)

1. **Error Handling**
   Source: `apps/w08-api/App-s_s-api.js` (lines 19-25)
   - Always wrap API calls in try-catch blocks
   - Provide user feedback for errors
   - Handle loading states appropriately

2. **State Management**
   Source: `apps/w08-api/App.js` (lines 17-24)
   - Use appropriate initial states
   - Update state immutably
   - Handle loading and error states

3. **Location Services**
   Source: `apps/w09-geo/App.js` (lines 31-45)
   - Always check permissions before accessing location
   - Provide fallbacks for denied permissions
   - Use appropriate accuracy levels

4. **Maps**
   Source: `apps/w09-map-demo/App.js` (lines 42-69)
   - Initialize with sensible default regions
   - Handle marker press events
   - Use appropriate zoom levels (latitudeDelta/longitudeDelta)

5. **Performance**
   Source: `apps/w08-api/App.js` (lines 31-45)
   - Use `useCallback` for function memoization
   - Implement proper list rendering optimization
   - Handle memory leaks in useEffect

### Common Patterns
Source: Combined from `apps/w08-api/App-s_s-api.js` and `apps/w09-geo/App.js`

```javascript
// API Data Fetching Pattern
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(URL);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchData();
}, []);
```

This guide serves as a reference for implementing APIs and Location Services in React Native Mobile applications following the methodology outlined in the instructional materials. Each code example and concept is sourced directly from the provided source files, with specific line numbers for reference.
