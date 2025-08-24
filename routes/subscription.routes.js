import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionById, getUpcomingRenewals, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// 1. GET all subscriptions for a user
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// 2. CREATE a new subscription
subscriptionRouter.post("/", authorize, createSubscription);

// 3. GET all subscriptions (admin use)
subscriptionRouter.get("/", authorize, getAllSubscriptions);

// 4. GET, UPDATE, DELETE a subscription by ID
subscriptionRouter.get("/:id", authorize, getSubscriptionById);

// 5. UPDATE a subscription
subscriptionRouter.put("/:id", authorize, updateSubscription);

// 6. DELETE a subscription
subscriptionRouter.delete("/", authorize, deleteSubscription);

// 7. CANCEL a subscription
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

// 8. GET upcoming renewals
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subscriptionRouter;