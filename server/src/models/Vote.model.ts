import { Document, model, Model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface NewVoteAttrs {
  email: string;
  candidate: string;
}

export interface VoteDoc extends Document {
  email: string;
  candidate: any;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

interface VoteModel extends Model<VoteDoc> {
  build(attrs: NewVoteAttrs): VoteDoc;
}

const voteSchema = new Schema<VoteDoc>(
  {
    email: { type: String, trim: true, required: true },
    candidate: { type: Schema.Types.ObjectId, ref: 'candidate', required: true },
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
voteSchema.plugin(updateIfCurrentPlugin);

// Adding static build method
voteSchema.statics.build = (attrs: NewVoteAttrs) => {
  return new Vote({
    email: attrs.email,
    candidate: attrs.candidate,
  });
};

export const Vote = model<VoteDoc, VoteModel>('vote', voteSchema);
