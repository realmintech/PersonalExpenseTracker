import { formatDate } from './utils/formatDate';

function TransactionList({ transactions }) {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Category</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-2">{formatDate(t.date)}</td>
                  <td className="py-2 capitalize">{t.type}</td>
                  <td className={`py-2 ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    ${t.amount.toFixed(2)}
                  </td>
                  <td className="py-2">{t.category}</td>
                  <td className="py-2">{t.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;