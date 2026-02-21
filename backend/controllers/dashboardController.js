import { Client } from '../models/Client.js';
import { Investment } from '../models/Investment.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [totalClients, investments] = await Promise.all([
    Client.countDocuments({ isDeleted: false }),
    Investment.find({ isDeleted: false }).lean()
  ]);

  const totals = investments.reduce(
    (acc, inv) => {
      acc.totalAum += inv.currentValue;
      acc.monthlySipCollection += inv.investmentType === 'sip' ? inv.sipAmount : 0;
      acc.pendingSipAmount += inv.paymentStatus === 'pending' ? inv.sipAmount : 0;
      acc.schemeAllocation[inv.schemeName] = (acc.schemeAllocation[inv.schemeName] || 0) + inv.currentValue;

      const monthKey = new Date(inv.investmentDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      acc.monthlyCollection[monthKey] = (acc.monthlyCollection[monthKey] || 0) + inv.totalInvestedAmount;
      return acc;
    },
    { totalAum: 0, monthlySipCollection: 0, pendingSipAmount: 0, schemeAllocation: {}, monthlyCollection: {} }
  );

  res.json({
    totalClients,
    totalAum: totals.totalAum,
    monthlySipCollection: totals.monthlySipCollection,
    pendingSipAmount: totals.pendingSipAmount,
    schemeAllocation: Object.entries(totals.schemeAllocation).map(([name, value]) => ({ name, value })),
    monthlyCollection: Object.entries(totals.monthlyCollection).map(([month, amount]) => ({ month, amount }))
  });
});
