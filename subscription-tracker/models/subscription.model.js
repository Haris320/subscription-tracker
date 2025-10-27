import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    
    name: { 
        type: String, 
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [2, "Subscription name must be at least 2 characters long"],
        maxlength: [100, "Subscription name must be less than 100 characters long"]
    },

    price: { 
        type: Number, 
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be greater than 0"]
    },
    
    currency: { 
        type: String, 
        enum: ['USD', 'EUR', 'GPB'],
        default: 'USD'
    },

    frequency: { 
        type: String, 
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },

    category: { 
        type: String, 
        enum: ['streaming', 'music', 'software', 'other'],
        required: [true, "Subscription category is required"]
    },

    paymentMethod: { 
        type: String, 
        required: [true, "Subscription payment method is required"],
        trim: true,
    },

    status: { 
        type: String, 
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },

    startDate: { 
        type: Date, 
        required: [true, "Subscription start date is required"],
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: "Start date must be in the past"
        }
    },

    endDate: { 
        type: Date, 
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "End date must be after start date"
        }
    },

    renewalDate: {
        type: Date
    },

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, "Subscription user is required"],
        index: true,
    },

}, { timestamps: true });

// Calculate the renew date based on the frequency
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});



export default mongoose.model("Subscription", subscriptionSchema);