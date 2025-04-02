# BTP610 - Assignment 3; POI Finder

## Setup
### Install dependencies
```bash
npm install
```
### Run
```bash
npx expo start
```

## Dependencies
### Expo Location
https://docs.expo.dev/versions/latest/sdk/location/

### React Native Maps
https://docs.expo.dev/versions/latest/sdk/map-view/

### GeoApify Places API
https://apidocs.geoapify.com/docs/places

## Implementation Guidelines
1. App must be running on either an Android or IOS device. Ensure your UI appears below the notch/status bar on your respective mobile device. To do this, use a `<SafeAreaView>` component and a style that programmatically calculates the amount of padding needed to move the content below the status bar/notch. See this link for an example: https://stackoverflow.com/a/73240772

2. All styling should be done directly in the styles object; no usage of 3rd party styling libraries permitted (React Native Paper, etc)

3. Use the following libraries:
- Expo location: https://docs.expo.dev/versions/latest/sdk/location/
- React Native Maps for the MapView, Marker, and Callout components: https://docs.expo.dev/versions/latest/sdk/map-view/ . See in class examples for how to use this library.

4. Implementation must follow techniques demonstrated in class.

5. In addition to the required functionality, learners are expected to use the coding conventions demonstrated in class, meaningful variable naming, and clearly organized code. Comments are helpful but not required.

## Problem Description

- Create an application that finds and displays points of interest (POIs) near the device’s current location.

- For this application, you must use the GeoApify Places API. Documentation: https://apidocs.geoapify.com/docs/places
- After familiarizing yourself with the API, create an app that meets these specifications:

1. Choose 2 types of points of interest (POIs) to show in the app. Here is a list of possible categories: https://apidocs.geoapify.com/docs/places/#categories
2. When the screen loads:
   
    a. Retrieve the device’s current location

    b. Connect to the API and display POIs near the device’s current location. For example, if your chosen categories are commercial.shopping_mall and healthcare.hospital, then your app should show all shopping malls and hospitals near the device’s current location.

    c. After data is retrieved, display the POIs as `<Marker>` elements on a `<MapView>`.

- The `<MapView>` must be centered on the device’s location
- The `<Marker>` should indicate what category the POI belongs to. Use a custom `<Marker>`.
- When the `<Marker>` is clicked, show a popup that displays the name of the POI (properties.name) and its full address (properties.address_line2). Use the `<Callout>` component to create the popup.

Here is a sample user interface for an app that shows restaurants and hotels near the CN Tower
1. You may customize the fonts, colors, and icons. However, the layout must be similar.
2. Ensure you use appropriate whitespacing throughout the design.
3. You are responsible for choosing the appropriate ui elements for the content and layout.

### Sample code for creating the popup
```js

import MapView, {Marker, Callout} from 'react-native-maps' 

<Marker key={0} coordinate={{latitude:43.64, longitude:-79.37}}> 
<Callout tooltip> <View style={styles.calloutContainer}> 
<Text style={styles.calloutTitle}> The Omni King Edward Hotel
 </Text> <Text style={styles.calloutDescription}> 37 King Street East, Toronto </Text> 
 </View> 
 </Callout>
  </Marker>
/*
calloutContainer: { width: 200, backgroundColor: 'white', borderRadius: 8, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom:-10 }, calloutTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5, }, calloutDescription: { fontSize: 12, },
*/
```
### Working with the API
The API requires usage of an API key.
Here’s how to obtain an API key
1. Signup for a free account here: https://myprojects.geoapify.com/register
2. Create a new project and give the project a name
3. Press the + button to obtain an API keyWhich endpoint do I use?

You must use the Places API endpoint: https://api.geoapify.com/v2/places?categories=CATEGORY1,CATEGORY2&conditions=named&filter=circle:LONGITUDE,LATITUDE,KM&limit=NUM_RESULTS&apiKey=API_KEY

Here are the details of the information you must provide to the endpoint:

#### CATEGORY1,CATEGORY2
The two categories of points of interest to search for. A list of categories is here: https://apidocs.geoapify.com/docs/places/#categories

Example: commerical.shopping_mall,beach will search for all shopping malls and beaches near the specified latitude and longitude.

#### LONGITUDE,LATITUDE
Specifies the latitude and longitude around where you should search for POIs

#### LONGITUDE 
must be specified first! (Normally, we specify latitudes before longitudes, but this API uses longitude first) 

#### KM
This number indicates the range of the search, in km.
Example: 5000
This will search for POIs within a 5km radius of the specified latitude and longitude 

#### NUM_RESULTS
The number of search results to retrieve.

#### API_KEY
Replace this with your GeoApify API key. Obtain a free API key by signing up for an account on the GeoApify website: https://myprojects.geoapify.com/register

Here is an example of an endpoint that searches for the first 20 banks and daycares within 12.5km radius of the CN Tower: 
https://api.geoapify.com/v2/places?categories=service.financial.bank,childcare&conditions=named&filter=circle:-79.3871,43.6426,12500&limit=20&apiKey=c2d678d137784365a6fb5c970fa7f1ba


### API Endpoints
https://api.geoapify.com/v2/places?PARAMS

#### Places API endpoint Template: 
`https://api.geoapify.com/v2/places?categories=CATEGORY1,CATEGORY2&conditions=named&filter=circle:LONGITUDE,LATITUDE,KM&limit=NUM_RESULTS&apiKey=API_KEY`

`https://api.geoapify.com/v2/places?categories=commercial.food_and_drink,sport&conditions=named&filter=circle:<LONGITUDE>,<LATITUDE,75&limit=15&apiKey=<API_KEY>`


Here are the details of the information you must provide to the "Places" endpoint:

##### CATEGORY1,CATEGORY2
The two categories of points of interest to search for.
- `commercial.food_and_drink`
- `sport.fitness`


##### API_KEY
Replace this with your GeoApify API key. Obtain a free API key by signing up for an account on the GeoApify website: https://myprojects.geoapify.com/register

https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=546e98d414d945e9a2894f263340f676
