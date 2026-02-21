import fs from 'fs';
import { Client } from '../models/Client.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createClient = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) {
    payload.kycDocument = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    };
  }

  const client = await Client.create(payload);
  res.status(201).json(client);
});

export const listClients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', riskProfile } = req.query;
  const query = { isDeleted: false };

  if (search) {
    query.$or = [
      { fullName: new RegExp(search, 'i') },
      { panNumber: new RegExp(search, 'i') }
    ];
  }
  if (riskProfile) query.riskProfile = riskProfile;

  const skip = (Number(page) - 1) * Number(limit);
  const [data, total] = await Promise.all([
    Client.find(query)
      .populate('assignedRelationshipManager', 'fullName email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),
    Client.countDocuments(query)
  ]);

  res.json({ data, meta: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
});

export const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, isDeleted: false }).populate(
    'assignedRelationshipManager',
    'fullName email'
  );

  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  res.json(client);
});

export const updateClient = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.kycDocument = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    };
  }

  const client = await Client.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, updateData, {
    new: true,
    runValidators: true
  });

  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }

  res.json(client);
});

export const softDeleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  res.json({ message: 'Client deleted successfully' });
});

export const downloadKyc = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, isDeleted: false });
  if (!client?.kycDocument?.path || !fs.existsSync(client.kycDocument.path)) {
    return res.status(404).json({ message: 'KYC file not found' });
  }

  res.download(client.kycDocument.path, client.kycDocument.originalName);
});
