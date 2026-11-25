# Smart Energy Management

A React + TypeScript website for viewing and managing home and business energy information.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

## Create a production build

```bash
npm run build
npm run preview
```

The production files are created in the `dist/` folder.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Sign in to Vercel and import that repository.
3. Keep the build command as `npm run build`.
4. Keep the output directory as `dist`.
5. Deploy the project.
6. In Vercel, open **Project Settings → Domains** and add `smartenergy.vercel.app`.
7. If Vercel says the domain is unavailable or already assigned, choose another available domain or complete the ownership/assignment steps shown by Vercel.

The project includes `vercel.json` to support client-side page routing.

## Project file guide

See [PROJECT_FILE_GUIDE.md](./PROJECT_FILE_GUIDE.md) for a simple explanation of the files, including which file is used for the Gas, Solar, Fuel, Electricity and Business sections.
