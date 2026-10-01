# Meera Tours & Travels

A production-ready travel booking website for flights, hotels, holiday packages, bus tickets and visa services.

The frontend is **Next.js + React + JavaScript** (no TypeScript). Dynamic data is served by Next.js API routes for local development, and by a **PHP + MySQL** backend for production.

## Stack

- Next.js 14 (App Router), React 18, JavaScript only
- CSS architecture with variables, component and page sheets
- PHP REST APIs, PDO, input validation
- MySQL schema with relationships and seed data

## Local frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works immediately: pages fetch `/api/*` from the Next.js route handlers, which read `src/data` and persist enquiries to `src/data/storage`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Homepage |
| `/flights` | Flight search |
| `/flights/search` | Flight results |
| `/flights/[id]` | Flight details + enquiry |
| `/hotels` | Hotel search |
| `/hotels/search` | Hotel results |
| `/hotels/[slug]` | Hotel details + enquiry |
| `/holiday-packages` | Package listing |
| `/holiday-packages/[slug]` | Package details + enquiry |
| `/bus` | Bus search |
| `/bus/search` | Bus results + enquiry |
| `/visa` | Visa services |
| `/visa/[slug]` | Visa details + enquiry |
| `/about` | About |
| `/contact` | Contact form |

## PHP + MySQL backend

1. Create the database:

```bash
mysql -u root -p < database/travel_booking.sql
```

2. Copy `backend/.env.example` to `backend/.env` and set credentials.

3. Serve the `backend/` folder with Apache/Nginx or PHP’s built-in server:

```bash
cd backend
php -S localhost:8080
```

4. Point the frontend at PHP:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

PHP endpoints:

- `GET /api/flights.php?from=BOM&to=DEL`
- `GET /api/flights.php?id=AI-615`
- `GET /api/hotels.php?city=Goa`
- `GET /api/packages.php?destination=Kerala`
- `GET /api/buses.php?from=Nashik&to=Mumbai`
- `GET /api/visa.php`
- `POST /api/enquiries.php`
- `POST /api/contact.php`

Responses always look like `{ success, message, data }`.

## Forms

Contact and enquiry forms validate on the client (name, email, Indian mobile) and again on the server. Successful submissions are stored in JSON (Next.js) or MySQL (`enquiries`, `contact_messages`) when PHP is connected.

## Project layout

```text
src/
  app/            pages + Next.js API routes
  components/     header, footer, booking, cards, home
  services/       API clients
  hooks/          useFetch, useForm
  styles/         CSS architecture
  data/           dynamic seed content
backend/          PHP REST API
database/         MySQL schema
```
# meera-tours-portal
