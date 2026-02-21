import { Client } from '../models/Client.js';
import { Investment } from '../models/Investment.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildInvestmentWorkbook } from '../utils/export.js';

export const addInvestment = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.clientId, isDeleted: false });
  if (!client) return res.status(404).json({ message: 'Client not found' });

  const investment = await Investment.create({ ...req.body, client: client._id });
  res.status(201).json(investment);
});

export const updateInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    req.body,
    { new: true, runValidators: true }
  );

  if (!investment) return res.status(404).json({ message: 'Investment not found' });
  if (investment.totalInvestedAmount > 0) {
    investment.returnsPercentage = Number((((investment.currentValue - investment.totalInvestedAmount) / investment.totalInvestedAmount) * 100).toFixed(2));
    await investment.save();
  }
  res.json(investment);
});

export const deleteInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
  if (!investment) return res.status(404).json({ message: 'Investment not found' });
  res.json({ message: 'Investment deleted' });
});

export const getClientInvestmentSummary = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.clientId, isDeleted: false });
  if (!client) return res.status(404).json({ message: 'Client not found' });

  const investments = await Investment.find({ client: client._id, isDeleted: false }).sort({ createdAt: -1 });

  const summary = investments.reduce(
    (acc, item) => {
      acc.totalInvested += item.totalInvestedAmount;
      acc.currentValue += item.currentValue;
      acc.pendingSip += item.paymentStatus === 'pending' ? item.sipAmount : 0;
      return acc;
    },
    { totalInvested: 0, currentValue: 0, pendingSip: 0 }
  );

  res.json({ client, investments, summary });
});

export const exportClientInvestments = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.clientId, isDeleted: false });
  if (!client) return res.status(404).json({ message: 'Client not found' });

  const investments = await Investment.find({ client: client._id, isDeleted: false }).lean();
  const workbook = await buildInvestmentWorkbook(client, investments);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${client.fullName}-investment-report.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
});
