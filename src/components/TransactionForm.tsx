"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { FiPlusCircle, FiEdit2, FiXCircle } from "react-icons/fi";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";


export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

interface TransactionFormProps {
  categories: string[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  addCategory: (category: string) => void;
  editingTransaction?: Transaction | null;
  cancelEdit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  addTransaction,
  addCategory,
  editingTransaction,
  cancelEdit,
}) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  const [newCategory, setNewCategory] = useState("");


  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type,
        amount: editingTransaction.amount.toString(),
        date: editingTransaction.date,
        category: editingTransaction.category,
        notes: editingTransaction.notes || "",
      });
    } else {
      setFormData({
        type: "expense",
        amount: "",
        date: "",
        category: "",
        notes: "",
      });
    }
  }, [editingTransaction]);

 
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.date || !formData.category) return;

    const newTransaction: Omit<Transaction, "id"> = {
      type: formData.type as "income" | "expense",
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      notes: formData.notes,
    };

    addTransaction(newTransaction);


    if (!editingTransaction) {
      const localData: Transaction[] =
        JSON.parse(localStorage.getItem("transactions") || "[]") || [];
      const sessionData: Transaction[] =
        JSON.parse(sessionStorage.getItem("transactions") || "[]") || [];

      const id = Date.now();
      const fullTransaction = { ...newTransaction, id };

      const updatedLocal = [...localData, fullTransaction];
      const updatedSession = [...sessionData, fullTransaction];

      localStorage.setItem("transactions", JSON.stringify(updatedLocal));
      sessionStorage.setItem("transactions", JSON.stringify(updatedSession));
    }

  
    setFormData({
      type: "expense",
      amount: "",
      date: "",
      category: "",
      notes: "",
    });
  };

 
  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#350802] via-[#5c0f04] to-[#b32708] text-white p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/10">
      <h2 className="text-2xl font-bold mb-5 text-center flex items-center justify-center gap-2">
        {editingTransaction ? (
          <>
            <FiEdit2 className="text-yellow-400 text-3xl" /> Edit Transaction
          </>
        ) : (
          <>
            <FiPlusCircle className="text-yellow-400 text-3xl" /> Add
            Transaction
          </>
        )}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white/10 p-5 rounded-xl shadow-inner"
      >
        <Select
          label="Transaction Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={[
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
          className="appearance-none text-white bg-[#b3270885] p-2 rounded-md outline"
        />

        <Input
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: "", label: "Select Category" },
            ...categories.map((cat) => ({ value: cat, label: cat })),
          ]}
          className="appearance-none text-white bg-[#b3270885] p-2 rounded-md outline"
          required
        />

        <Input
          label="Notes"
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 bg-[#f9d423] hover:bg-[#f39c12] text-[#350802] font-semibold py-2 rounded-lg transition-all duration-300"
          >
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </Button>

          {editingTransaction && (
            <Button
              type="button"
              onClick={cancelEdit}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              <FiXCircle /> Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="mt-8 border-t border-white/20 pt-5">
        <h3 className="text-lg font-semibold mb-3 text-center flex items-center justify-center gap-2">
          Add a New Category
        </h3>
        <form
          onSubmit={handleAddCategory}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Input
            type="text"
            label="Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="appearance-none bg-white/10 text-[#350802] p-2 rounded-md outline"
          />
          <Button
            type="submit"
            className="bg-[#f9d423] hover:bg-[#f39c12] text-[#350802] px-2 py-2 rounded-lg font-semibold transition-all"
          >
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
