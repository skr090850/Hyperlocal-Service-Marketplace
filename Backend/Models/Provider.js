const mongoose = require('mongoose');

const MediaFileSchema = new mongoose.Schema({
  url: { 
    type: String,
    required: true,
  },
  fileName: { 
    type: String,
    required: true,
  },
  mimeType: { 
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProviderSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
        unique: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    },
    Password:{
        type: String,
        required: true,
        minlength: 8
    },
    ConfirmPassword: {
        type: String,
        required: true,
        minlength: 8
    },
    BusinessDoc:{
        type: MediaFileSchema,
        required: true, 
    }
});

const Provider = mongoose.model('Provider', ProviderSchema);
module.exports = Provider;