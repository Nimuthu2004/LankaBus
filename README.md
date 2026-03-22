🎫 Ticketing System Backend
A robust Node.js & Express backend service for a real-time ticketing platform. This system processes user travel routes (Origin to Destination) and retrieves dynamic fare data from a PostgreSQL database.

🚀 Features
Route Lookup: Resolves human-readable station names (e.g., "Galle") to unique IDs.

Fare Calculation: Queries a relational database to fetch specific fares between two points.

Real-Time Ready: Optimized for low-latency responses using indexed database lookups.

Error Handling: Validates inputs and provides clear feedback for missing routes or locations.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: PostgreSQL (Supabase)

Querying: [State your method here, e.g., @supabase/supabase-js or pg driver]

📂 Database Schema
The backend interacts with two primary tables in the public schema:

1. Stations
Maps locations to unique identifiers.

id (int8): Primary Key.

Name (text): The station name (e.g., "Makumbura").

Station_Code (int8): Unique numeric code.

2. Fares
Contains the pricing logic for specific journeys.

id (int8): Primary Key.

start_station_id (int8): Foreign Key to Stations.id.

end_station_id (int8): Foreign Key to Stations.id.

amount (float8): The ticket price for this specific route.

🚦 Getting Started
Prerequisites
Node.js (v18+ recommended)

A Supabase project or PostgreSQL instance
