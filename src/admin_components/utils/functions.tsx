import * as XLSX from "xlsx";

export const numberWithCommas = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const numberToFixed = (number: number | string, fixedTo: number = 2) => {
  const formattedNumber = Number(number).toFixed(fixedTo);
  return formattedNumber.replace(/\.?0*$/, "");
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};

export const convertToExcel = (tableData) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(tableData);
  // Calculate column widths based on the content length
  const wscols = tableData[0].map((_, colIndex) => ({
    wch: Math.max(
      ...tableData.map((row) =>
        row[colIndex] ? String(row[colIndex]).length : 0
      )
    ),
  }));
  // Set column widths in the worksheet
  ws["!cols"] = wscols;
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  // Generate a binary string from the workbook
  const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
  // Convert the binary string to a Blob
  const blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "jinwen_investors.xlsx");
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
};
