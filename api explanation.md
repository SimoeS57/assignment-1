## Overview
The NASA NEO API provides access to data about asteroids and comets that come near Earth. It is publicly available and requires a free API key for access.

## Endpoint Used
- **Feed endpoint**: `https://api.nasa.gov/neo/rest/v1/feed`
- Fetches data for a specified date range.

### Query Parameters
- `start_date` (YYYY-MM-DD) — first date to query.
- `end_date` (YYYY-MM-DD) — last date to query.
- `api_key` — your NASA API key (e.g., `DEMO_KEY` for testing or your personal key).

### Response
The response is a JSON object with the following key parts:
- `near_earth_objects` — an object keyed by dates, containing arrays of asteroid objects.
- Each asteroid object includes:
  - `estimated_diameter` — min and max sizes in kilometers, meters, miles, and feet.
  - `is_potentially_hazardous_asteroid` — boolean indicating hazard risk.
  - `close_approach_data` — info about approach date, distance, and relative velocity.