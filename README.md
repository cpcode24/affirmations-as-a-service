# affirmations-as-a-service

A tiny HTTP API that returns random words of affirmation. It's intended to be a minimal, self-hostable service that can be used by web apps, widgets, or automation to fetch positive, categorized affirmations.

## Features

- Simple JSON API with category support
- CORS enabled for all origins
- Per-IP rate limiting (configurable via code)
- Small, dependency-only Node.js implementation
- Data driven by `affirmations.json` (multiple categories)

## Tech stack

- Node.js (Runtime)
- Express (HTTP server)
- cors (CORS middleware)
- express-rate-limit (basic rate limiting)

Key files

- `index.js` — the Express server and route handlers
- `affirmations.json` — the dataset of affirmations, grouped by category
- `package.json` — npm metadata and start script
- `Dockerfile` — containerization (optional)

## Endpoints

- GET /
  - Returns a small welcome message and a short usage hint.

- GET /affirmation
  - Returns a random affirmation from the default category (`self-esteem`).
  - Response example: `{ "affirmation": "I grow more confident and stronger each day." }`

- GET /affirmation/:category
  - Returns a random affirmation from the specified category (e.g. `self-esteem`, `health`, `career`, `productivity`, `happiness`, `abundance`).
  - Example: `GET /affirmation/health` → `{ "affirmation": "I am healthy and strong." }`

Notes

- The service trusts the `X-Forwarded-For`/proxy headers (`app.set('trust proxy', true)`) so it can be run behind a proxy or platform like Cloudflare. Rate limiting is per-IP.
- Default port: `8000`. You can override with the `PORT` environment variable.

## Run locally

1. Install dependencies

   npm install

2. Start the server

   npm start

3. Open or curl

   curl http://localhost:8000/affirmation

## Run with Docker

Build the image:

   docker build -t affirmations-as-a-service .

Run it (map port 8000):

   docker run -p 8000:8000 --rm affirmations-as-a-service

Then query the API:

   curl http://localhost:8000/affirmation

## Customization

- Change the affirmations in `affirmations.json` to add or edit categories and lines.
- Adjust rate limiting or CORS settings in `index.js` if you need different limits or origins.

## Contributing

Contributions are welcome. Open a PR with changes to `affirmations.json` or enhancements to the server code. Keep changes small and documented.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
