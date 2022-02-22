import { Document, model, Model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface CandidateDoc extends Document {
  name: string;
  imageUrl: string;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

interface CandidateModel extends Model<CandidateDoc> {}

const candidateSchema = new Schema<CandidateDoc>(
  {
    name: { type: String, trim: true, required: true },
    imageUrl: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: 'version',
  }
);

// Defining Data Concurrency Controll
candidateSchema.plugin(updateIfCurrentPlugin);

export const Candidate = model<CandidateDoc, CandidateModel>('candidate', candidateSchema);
