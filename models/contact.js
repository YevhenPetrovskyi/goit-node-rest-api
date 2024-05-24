import mongoose from 'mongoose';

const contactsSchemas = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be maximum 50 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email address',
      },
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            v
          );
        },
        message:
          'Please enter a valid phone number. Example: "(123) 456-7890", "123 456 7890", "+123-456-7890", "1234567890"',
      },
    },

    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

export const Contact = mongoose.model('contact', contactsSchemas);
