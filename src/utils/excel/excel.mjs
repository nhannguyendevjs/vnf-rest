/**
 * Autofit columns by width
 *
 * @param worksheet {ExcelJS.Worksheet}
 * @param minimalWidth
 */
const autoWidth = (worksheet, minimalWidth = 20) => {
  worksheet.columns.forEach((column) => {
    let maxColumnLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      maxColumnLength = Math.max(maxColumnLength, minimalWidth, cell.value ? cell.value.toString().length : 0);
    });
    column.width = maxColumnLength + 2;
  });
};

export { autoWidth };
