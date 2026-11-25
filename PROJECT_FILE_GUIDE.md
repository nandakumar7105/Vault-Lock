# Smart Energy Management – Project File Guide

This file explains what each important file does in simple words.

## 1. Main website files

| File | Simple explanation |
|---|---|
| `src/main.tsx` | Starts the React website and loads the main App. |
| `src/App.tsx` | Main application setup. It connects the dashboard, notifications and page navigation. |
| `src/pages/Index.tsx` | Opens the main energy dashboard. |
| `src/pages/NotFound.tsx` | Shows a message when a page or URL is not found. |
| `index.html` | Main HTML page. It contains the browser title and website information. |
| `vite.config.ts` | Settings used by Vite to run and build the website. |
| `package.json` | Lists the libraries used by the project and commands such as `npm run dev`. |
| `vercel.json` | Helps Vercel send website routes to the React application. |

## 2. Main feature files – `src/components/`

| File | Simple explanation |
|---|---|
| `EnergyDashboard.tsx` | Main dashboard. It brings the energy sections together and manages the screen flow. |
| `MainSelection.tsx` | Shows the main choices, such as Home and Business. |
| `EnergyTypes.tsx` | Shows the energy choices: Electricity, Gas, Fuel and Solar. |
| `RoomSelection.tsx` | Shows the rooms available under the electricity section. |
| `GasModule.tsx` | Gas page. Displays the gas-related monitoring information. |
| `SolarModule.tsx` | Solar page. Displays solar generation and solar-related information. |
| `FuelModule.tsx` | Fuel page. Displays fuel-related quantity, usage and cost information. |
| `BusinessModule.tsx` | Business or organisation energy section. |
| `EnergyCard.tsx` | Reusable card design for showing energy information. |
| `ApplianceCard.tsx` | Shows one appliance and its details, such as status and usage. |
| `ActiveDevicesList.tsx` | Lists appliances or devices that are currently active. |
| `MonthlyChart.tsx` | Shows energy usage in a monthly chart. |
| `PaymentDialog.tsx` | Displays the payment dialog/interface. |
| `Breadcrumb.tsx` | Shows the user's current navigation path. |
| `NavLink.tsx` | Provides a styled navigation link. |

## 3. Supporting folders

| Folder / file | Simple explanation |
|---|---|
| `src/assets/` | Stores images used by the website, including the energy background image. |
| `src/components/ui/` | Reusable design elements such as buttons, cards, dialogs, inputs and tabs. |
| `src/hooks/` | Reusable React logic. For example, appliance state and notification handling. |
| `src/lib/` | Helper functions used in different parts of the website. |
| `src/index.css` | Global styles for the website. |
| `src/App.css` | Application-level styles, if used. |

## 4. How the main website flow works

1. `main.tsx` starts the website.
2. `App.tsx` loads the application and its routes.
3. `Index.tsx` opens `EnergyDashboard.tsx`.
4. `EnergyDashboard.tsx` displays the main selection and energy sections.
5. The relevant component displays the selected section:
   - `GasModule.tsx` – Gas page
   - `SolarModule.tsx` – Solar page
   - `FuelModule.tsx` – Fuel page
   - `EnergyTypes.tsx` and `RoomSelection.tsx` – Electricity and room selection
   - `BusinessModule.tsx` – Business page

## 5. Run the project on your computer

Install Node.js, open a terminal in this project folder, and run:

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

The generated website files will be placed in the `dist` folder.

## 6. Website address and hosting

Preferred Vercel address: `https://smartenergy.vercel.app/`

This address is configured as the canonical website address in `index.html`. The actual address becomes active only after the project is deployed to Vercel and that domain is assigned to this project in Vercel. Domain availability is not guaranteed.

## 7. Important project note

The code in this repository is the website application. The presence of a dashboard or payment screen does not by itself mean that live IoT sensors, a real payment gateway, or a production database are connected. Those integrations must be configured separately.
