import { useState } from "react";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionFilter from "./components/TransactionFilter";
import TransactionList from "./components/TransactionList";
import FinanceChart from "./components/FinanceChart";
import useLocalStorage from "./components/hooks/useLocalStorage";
// import { Transaction, Filters } from "./components/"; 

const App: React.FC = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );
  const [categories, setCategories] = useLocalStorage<string[]>("categories", [
    "Salary",
    "Freelance",
    "Food",
    "Rent",
    "Utilities",
    "Entertainment",
  ]);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    startDate: "",
    endDate: "",
    sortBy: "date-desc",
  });

  // Track the transaction being edited
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Add or update transaction
  const addOrUpdateTransaction = (transaction: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id ? { ...t, ...transaction } : t
        )
      );
      setEditingTransaction(null);
    } else {
      // Add new transaction
      const newTransaction: Transaction = { ...transaction, id: Date.now() };
      setTransactions([...transactions, newTransaction]);
    }
  };

  // Delete transaction
  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Edit transaction
  const editTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  // Filtered & sorted transactions
  const filteredTransactions = transactions
    .filter((t) => {
      const matchesCategory = filters.category
        ? t.category === filters.category
        : true;
      const matchesStartDate = filters.startDate
        ? new Date(t.date) >= new Date(filters.startDate)
        : true;
      const matchesEndDate = filters.endDate
        ? new Date(t.date) <= new Date(filters.endDate)
        : true;
      return matchesCategory && matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#350802] via-[#5c0f04] to-[#b32708] text-white">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Form */}
          <div className="lg:col-span-1">
            <TransactionForm
              categories={categories}
              addTransaction={addOrUpdateTransaction}
              addCategory={(cat) => {
                if (!categories.includes(cat))
                  setCategories([...categories, cat]);
              }}
              editingTransaction={editingTransaction}
              cancelEdit={() => setEditingTransaction(null)}
            />
          </div>

          {/* Right column - Filters, Chart, and List */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionFilter
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              transactions={transactions}
            />
            <FinanceChart transactions={filteredTransactions} />
            <TransactionList
              transactions={filteredTransactions}
              onEdit={editTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
