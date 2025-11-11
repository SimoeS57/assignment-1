This is a Node.js web service that fetches and displays information about Near-Earth Objects (asteroids) from NASA's public API. The service provides statistics for asteroids approaching Earth **today**, including total number, average diameter, largest, and smallest diameters. 

The service can return data in both **HTML** and **JSON** formats.

## Functionalities
- Fetches asteroid data from NASA's NEO (Near-Earth Object) API.
- Calculates:
  - Total number of asteroids for today.
  - Average diameter of all asteroids.
  - Biggest and smallest asteroid diameters.
- Displays results:
  - In **HTML** at `http://localhost:3000`.
  - In **JSON** at `http://localhost:3000/api`.