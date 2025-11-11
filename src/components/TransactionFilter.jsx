import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { exportToCSV } from './utils/exportToCSV';

function TransactionFilter({ categories, filters, setFilters, transactions }) {
  const handleExport = () => {
    exportToCSV(transactions, 'transactions.csv');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Filter Transactions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          options={[{ value: '', label: 'All Categories' }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
        />
        <Input
          label="Start Date"
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <Input
          label="End Date"
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          options={[
            { value: 'date-desc', label: 'Date (Newest First)' },
            { value: 'date-asc', label: 'Date (Oldest First)' },
            { value: 'amount-desc', label: 'Amount (High to Low)' },
            { value: 'amount-asc', label: 'Amount (Low to High)' }
          ]}
        />
      </div>
      <Button onClick={handleExport} className="btn-primary mt-4">Export to CSV</Button>
    </div>
  );
}

export default TransactionFilter;