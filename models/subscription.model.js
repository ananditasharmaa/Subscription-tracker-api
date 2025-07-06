import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"]
    },
    currency:{
        type: String,
        required: true,
        enum : ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
        default: 'INR'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category:{
        type: String,
        enum: ['entertainment', 'news', 'sports', 'education', 'finance', 'politics', 'technology', 'health', 'other'],
        required: true,
    },
    paymentMethod:{
        type: String,
        trim: true,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'other'],
        required: true,
    },
    status:{
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future"
        }
    },
    renewalDate:{
        type: Date,
        validate:{
            validator: function(value) {
                value > new Date();
            },
            message: "Renewal date must be after the start date"
        }
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, { timestamps: true });

// Pre-save hook to validate renewal date
// This hook checks add the renewal date if missing
subscriptionSchema.pre('save', function(next) {
  const renewalPeriod = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365
  };

  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + (renewalPeriod[this.frequency] || 0)
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});



const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;