import React, { ChangeEvent } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { exportToCSV } from "./utils/exportToCSV";
import { Transaction } from "../App";

// Define filter types
export type SortBy = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export interface Filters {
  category: string;
  startDate: string;
  endDate: string;
  sortBy: SortBy;
}

interface TransactionFilterProps {
  categories: string[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  transactions: Transaction[];
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  categories,
  filters,
  setFilters,
  transactions,
}) => {
  const handleDownload = () => {
    exportToCSV(transactions, "finance_data.csv");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value } as Filters);
  };

  return (
    <section className="bg-gradient-to-br from-[#F9F5EC] to-[#ffffff] border border-[#E5A823]/40 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-[#350802] tracking-tight">
          Refine Your Transactions
        </h2>
        <Button
          onClick={handleDownload}
          className="bg-[#E5A823] hover:bg-[#350802] hover:text-[#F9F5EC] text-[#350802] px-5 py-2 rounded-md font-medium transition-all"
        >
          ⬇ Export CSV
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Select Category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          options={[
            { value: "", label: "All" },
            ...categories.map((cat) => ({ value: cat, label: cat })),
          ]}
          className="appearance-none bg-white/10 text-[#350802] p-2 rounded-md outline"
        />

        <Input
          label="From Date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="appearance-none bg-white/10 text-[#350802] p-2 rounded-md outline"
        />

        <Input
          label="To Date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="appearance-none bg-white/10 text-[#350802] p-2 rounded-md outline"
        />
      </div>
    </section>
  );
};

export default TransactionFilter;
