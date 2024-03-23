# Fairsharely 🤑

This app makes it easy to track and manage expenses within a group.
It allows each participant to add and manage expenses made for an occasion, e.g an event or a shared trip.
Afterwards, the app calculates the easiest way how to balance expenses by minimizing the total amount of transactions for everyone.

**It's currently heavily work-in-progress.**

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Getting Started

Run this app locally via:

```
npm install

npm run dev
```

You probably also need to update the values in the `.env` file to set a correct database connection URL.

### Database Schema

This project is using Prisma as database ORM and a Postgres instance at Vercel.
After each change, you need to regenerate the types and also synchronise the schema with the database.

Do that via:

```
npx prisma generate     # Regenerates the Prisma schema
npx prisma format       # Formats the schema file

npx prisma db push      # Pushes changes to database

npx prisma studio       # Opens a local interface to inspect database
```

## Deployment

This app is currently deployed via Vercel.
See the repository description for the latest link.
