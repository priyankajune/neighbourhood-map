## Project Specification
A single-page application using React featuring a map of neighborhood. Additional functionality of this application, includes: map markers to identify popular locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations. Researched and implemented third-party APIs that provide additional information about each of these locations.

## Running App Locally
1) Clone the repo
2) Go into the cloned folder
3) Run `npm install`
4) Then `npm start`
5) Visit the site at `localhost:3000`
6) If 3000 is already in use, change the port from package.json
7) In start set the port as `set PORT=3001 && react-scripts start`

## Note
Service Worker will not work in development mode.So
1) Run `npm build` to run in production mode
2) Run `npm run deploy` to deployat a specific address

## Dependencies
1) [Foursquare API](https://developer.foursquare.com/)
2) [Google Maps API](https://developers.google.com/maps/documentation/)