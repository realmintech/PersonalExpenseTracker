import { useState } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionFilter from './components/TransactionFilter';
import TransactionList from './components/TransactionList';
import FinanceChart from './components/FinanceChart';
import useLocalStorage from './components/hooks/useLocalStorage';

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [categories, setCategories] = useLocalStorage('categories', [
    'Salary', 'Freelance', 'Food', 'Rent', 'Utilities', 'Entertainment'
  ]);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    sortBy: 'date-desc'
  });

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredTransactions = transactions
    .filter((t) => {
      const matchesCategory = filters.category ? t.category === filters.category : true;
      const matchesStartDate = filters.startDate ? new Date(t.date) >= new Date(filters.startDate) : true;
      const matchesEndDate = filters.endDate ? new Date(t.date) <= new Date(filters.endDate) : true;
      return matchesCategory && matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (filters.sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (filters.sortBy === 'amount-desc') return b.amount - a.amount;
      if (filters.sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-blue-300">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TransactionForm
              categories={categories}
              addTransaction={addTransaction}
              addCategory={addCategory}
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <TransactionFilter
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              transactions={transactions}
            />
            <FinanceChart transactions={filteredTransactions} />
            <TransactionList transactions={filteredTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;