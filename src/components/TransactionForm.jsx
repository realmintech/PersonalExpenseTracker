import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

function TransactionForm({ categories, addTransaction, addCategory }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: '',
    category: '',
    notes: ''
  });
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date || !formData.category) {
      console.warn('Form validation failed: Missing required fields', formData);
      return;
    }
    const transaction = { ...formData, amount: parseFloat(formData.amount) };
    console.log('Submitting transaction:', transaction);
    addTransaction(transaction);
    setFormData({ type: 'expense', amount: '', date: '', category: '', notes: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      console.log('Adding category:', newCategory.trim());
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          options={['income', 'expense'].map((type) => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1)
          }))}
        />
        <Input
          label="Amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[{ value: '', label: 'Select Category' }, ...categories.map((cat) => ({
            value: cat,
            label: cat
          }))]}
          required
        />
        <Input
          label="Notes"
          type="text"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <Button type="submit" className="btn-primary">Add Transaction</Button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />
          <Button type="submit" className="btn-primary">Add</Button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;