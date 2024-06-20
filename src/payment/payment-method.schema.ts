// src/payment/payment-method.schema.ts

import * as mongoose from 'mongoose';

export const PaymentMethodSchema = new mongoose.Schema({
  nameOnCard: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvc: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  // Additional fields specific to your application
});

export interface PaymentMethod extends mongoose.Document {
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  country: string;
  zip: string;
  // Define additional fields as needed
}
