import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

/**
 * Create Subscription
 * -----------------------------------------------------
 * Business logic:
 * - Attach authenticated user
 * - Trigger workflow (Upstash)
 * - Return subscription + workflowRunId
 */
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Trigger renewal reminder workflow
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId }
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Get All Subscriptions for a User
 * -----------------------------------------------------
 * Authorization rule:
 * - req.user.id must match requested :id
 */
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not authorized to access this resource');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

/**
 * Get Single Subscription by ID
 * -----------------------------------------------------
 * Business logic:
 * - Validate subscription exists
 * - Check that it belongs to requesting user
 */
export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error('You are not authorized to view this subscription');
      error.status = 401;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

/**
 * Update Subscription
 * -----------------------------------------------------
 * Notes:
 * - User can update only their subscription
 * - When frequency changes → renewal date must be recalculated automatically by pre-save hook
 */
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error('You are not authorized to update this subscription');
      error.status = 401;
      throw error;
    }

    Object.assign(subscription, req.body);
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

/**
 * Delete Subscription
 * -----------------------------------------------------
 * Notes:
 * - Auth required
 * - Only owner can delete
 */
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error('Unauthorized access');
      error.status = 401;
      throw error;
    }

    await subscription.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Cancel Subscription (soft cancellation)
 * -----------------------------------------------------
 * Notes:
 * - Status updated to "cancelled"
 * - Workflow may be disabled here (optional)
 */
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error('Unauthorized access');
      error.status = 401;
      throw error;
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Get Upcoming Renewals
 * -----------------------------------------------------
 * Business logic:
 * - Show renewals due in next X days (default: 7)
 * - Must be user-specific (uses req.user.id)
 */
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const days = Number(req.query.days) || 7;

    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + days);

    const renewals = await Subscription.find({
      user: req.user.id,
      renewalDate: { $gte: now, $lte: future },
      status: 'active'
    });

    res.status(200).json({
      success: true,
      data: renewals
    });
  } catch (e) {
    next(e);
  }
};
