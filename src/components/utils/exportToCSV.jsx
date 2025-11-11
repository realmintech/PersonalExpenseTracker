export function exportToCSV(transactions, filename) {
  const headers = ['Date', 'Type', 'Amount', 'Category', 'Notes'];
  const rows = transactions.map((t) => [
    t.date,
    t.type,
    t.amount,
    t.category,
    t.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}