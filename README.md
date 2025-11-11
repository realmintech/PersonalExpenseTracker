#  Personal Finance Tracker

A lightweight, responsive **React + TypeScript** application to help users monitor their income and expenses. Track financial activity with custom categories, detailed filters, and interactive charts. Built with usability, responsiveness, and performance in mind.

---

##  Features

- Add, edit, and delete income or expense transactions
- Create custom categories for detailed tracking
- Filter and sort transactions by category, date, or amount
- Responsive bar and doughnut chart visualizations
- Persistent data using browser **localStorage**
- Responsive UI for mobile, tablet, and desktop
- Type-safe development with **TypeScript**

---

##  Tech Stack

- **React** (with TypeScript)
- **Tailwind CSS** for styling
- **Chart.js + react-chartjs-2** for charts
- **LocalStorage API** for persistent storage
- **React Icons** for intuitive UI elements

---

##  Getting Started (Local Setup)

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/personal-finance-tracker.git
cd personal-finance-tracker
Install dependencies

npm install
Run the development server

bash
npm run dev
Open the app

Go to http://localhost:5173 in your browser.

Project Structure
personal-finance-tracker
├──  src
│   ├──  components
│   │   ├── Header.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionList.tsx
│   │   ├── TransactionFilter.tsx
│   │   ├── FinanceChart.tsx
│   │   └── hooks
│   │       └── useLocalStorage.ts
│   ├── App.tsx
│   └── index.tsx
├──  package.json
├──  tsconfig.json
├──  tailwind.config.js
└──  README.md
How It Works
Add Transactions – Fill in transaction details and submit. Income and expenses are saved locally.

Edit/Delete – Manage existing records directly from the transaction list.

Analyze – View income vs expense per category using a Bar Chart and category proportion using a Doughnut Chart.

Persistent Storage – All data is stored persistently using localStorage.

Key Components
Component	Description
TransactionForm	Add or edit transactions
TransactionList	Displays all transactions with actions
TransactionFilter	Filter and sort transactions
FinanceChart	Visualizes data with bar & doughnut charts
useLocalStorage	Custom hook for persistent state

Author
Adesina Mariam – Full Stack Developer
Lagos, Nigeria
