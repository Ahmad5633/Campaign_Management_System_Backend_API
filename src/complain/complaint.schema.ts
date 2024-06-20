import * as mongoose from 'mongoose';

export const ComplaintSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Complaint extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  description: string;
}
