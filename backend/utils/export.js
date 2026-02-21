import ExcelJS from 'exceljs';

export const buildInvestmentWorkbook = async (client, investments) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Investment Report');

  sheet.columns = [
    { header: 'Client Name', key: 'clientName', width: 24 },
    { header: 'Scheme Name', key: 'schemeName', width: 24 },
    { header: 'AMC Name', key: 'amcName', width: 18 },
    { header: 'Type', key: 'investmentType', width: 12 },
    { header: 'SIP Amount', key: 'sipAmount', width: 12 },
    { header: 'Total Invested', key: 'totalInvestedAmount', width: 16 },
    { header: 'Current Value', key: 'currentValue', width: 14 },
    { header: 'Returns %', key: 'returnsPercentage', width: 10 },
    { header: 'Folio Number', key: 'folioNumber', width: 18 },
    { header: 'Payment Status', key: 'paymentStatus', width: 14 }
  ];

  investments.forEach((inv) => {
    sheet.addRow({
      clientName: client.fullName,
      ...inv
    });
  });

  return workbook;
};
