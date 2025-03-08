import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "sub name req"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      require: [true, "price req"],
      min: [0, "price must greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "BDT", "EUR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "biweekly", "monthly", "yearly", "biyearly"],
    },
    category: {
      type: String,
      enum: ["sports", "news", "entertainment", "lifestyle"],
    },
    paymentMethod: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      require: true,
      validate: {
        validator: (value) => value <= new Date(),
        msg: "starting date must be in the past",
      },
    },
    renewalData: {
      type: true,
      require: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        msg: "renewal date must be greater than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
