import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

// 1. CREATE a new subscription
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`
,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

// 2. GET all subscriptions for a user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ userId: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}

// 3. GET all subscriptions (admin use)
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({});
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

// 4. GET one subscription by ID
export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

// 5. UPDATE a subscription
export const updateSubscription = async (req, res, next) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    next(e);
  }
};

// 6. DELETE a subscription (by ID via query param or body)
export const deleteSubscription = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Subscription ID is required" });
    }

    const deleted = await Subscription.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (e) {
    next(e);
  }
};

// 7. CANCEL subscription
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    if (subscription.status === 'cancelled') {
      return res.status(400).json({ success: false, message: "Subscription already cancelled" });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({ success: true, data: subscription, message: "Subscription cancelled" });
  } catch (e) {
    next(e);
  }
};

// 8. GET upcoming renewals
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date();
    const next7Days = new Date(now);
    next7Days.setDate(now.getDate() + 7);

    const renewals = await Subscription.find({
      nextRenewal: { $gte: now, $lte: next7Days },
      status: { $ne: 'cancelled' },
    });

    res.status(200).json({ success: true, data: renewals });
  } catch (e) {
    next(e);
  }
};
