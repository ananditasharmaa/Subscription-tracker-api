import User from '../models/user.model.js';

/**
 * GET /users
 * ----------------------------------------------------
 * Public list of users but removes sensitive fields.
 * Acts as a directory, not exposing email or password.
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('name createdAt');

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /users/:id
 * ----------------------------------------------------
 * Owner-only access.
 */
export const getUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('Unauthorized access');
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /users/:id
 * ----------------------------------------------------
 * Update user details — but restrict fields for security.
 */
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('Unauthorized access');
      error.statusCode = 401;
      throw error;
    }

    const allowedUpdates = ['name']; // restrict editable fields
    const updates = {};

    for (let field of allowedUpdates) {
      if (req.body[field]) updates[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /users/:id
 * ----------------------------------------------------
 * Owner-only deletion.
 */
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('Unauthorized access');
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
