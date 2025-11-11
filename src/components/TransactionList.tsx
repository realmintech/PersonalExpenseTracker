import { formatDate } from "./utils/formatDate";
import { Transaction } from "../App";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-300 text-center py-4">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-4 rounded-tl-lg">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr
                  key={t.id}
                  className={`#{
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  } hover:bg-white/20 transition-colors duration-200`}
                >
                  <td className="py-3 px-4">{formatDate(t.date)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        t.type === "income"
                          ? "bg-green-600/30 text-green-200"
                          : "bg-red-600/30 text-red-200"
                      }`}
                    >
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${t.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">{t.category}</td>
                  <td className="py-3 px-4">{t.notes || "-"}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => onEdit(t)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
