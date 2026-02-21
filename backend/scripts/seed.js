import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Client } from '../models/Client.js';
import { Investment } from '../models/Investment.js';

const seed = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Client.deleteMany({}), Investment.deleteMany({})]);

  const admin = await User.create({
    fullName: 'MMI Admin',
    email: 'admin@mmi.com',
    password: 'Admin@12345',
    role: 'admin'
  });

  const rm = await User.create({
    fullName: 'Rahul Sharma',
    email: 'rm@mmi.com',
    password: 'Manager@12345',
    role: 'relationship_manager'
  });

  const client = await Client.create({
    fullName: 'Priya Malhotra',
    dob: '1989-07-12',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '123456789012',
    email: 'priya@example.com',
    mobile: '9876543210',
    address: 'Bengaluru, Karnataka',
    bankDetails: { accountHolderName: 'Priya Malhotra', accountNumber: '12345678901', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234' },
    nomineeDetails: { name: 'Rohan Malhotra', relation: 'Spouse', contact: '9988776655' },
    riskProfile: 'moderate',
    assignedRelationshipManager: rm._id
  });

  await Investment.create([
    {
      client: client._id,
      schemeName: 'Axis Bluechip Fund',
      amcName: 'Axis AMC',
      investmentType: 'sip',
      sipAmount: 10000,
      totalInvestedAmount: 120000,
      investmentDate: '2024-01-10',
      folioNumber: 'FOLIO12345',
      currentValue: 133500,
      nextSipDueDate: '2026-03-01',
      paymentStatus: 'paid'
    },
    {
      client: client._id,
      schemeName: 'SBI Small Cap Fund',
      amcName: 'SBI AMC',
      investmentType: 'lump_sum',
      sipAmount: 0,
      totalInvestedAmount: 50000,
      investmentDate: '2024-03-14',
      folioNumber: 'FOLIO98765',
      currentValue: 58200,
      paymentStatus: 'pending'
    }
  ]);

  console.log('Dummy data seeded successfully');
  await mongoose.connection.close();
};

seed();
