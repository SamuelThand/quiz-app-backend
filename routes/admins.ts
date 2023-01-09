import Express from 'express';
import { Admin } from '../models/admin';

const adminRoutes = Express.Router();

// TODO: Make sure that passwords are hashed.

/**
 * Get an array of all admins from the database.
 *
 * @route GET /admins
 * @returns 200 - The admins, 500 - Error
 */
adminRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Admin.getAdmins()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * Get an admin by username.
 *
 * @route GET /admins/:username
 * @param username of the admin
 * @return 200 - The admin, 404 - Not found, 500 - Error
 */
adminRoutes.get(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    const username = req.params.username;
    Admin.getAdminByUsername(username)
      .then((result) => {
        result
          ? res.status(200).json(result)
          : res.status(404).json({ message: 'Admin not found' });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

/**
 * Add a new admin.
 *
 * @route POST /admins
 * @return 201 - The new admin, 409 - Conflict, 400 - Invalid, 500 - Error
 */
adminRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const newAdmin = new Admin(req.body);
  Admin.addAdmin(newAdmin)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        res
          .status(409)
          .json({ message: 'An admin already exists with that username.' });
      } else if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'New admin has an incorrect format' });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// TODO path breaks when trying to update immutable value _id
/**
 * Update an admin.
 *
 * @route PUT /admins/:username
 * @param username of the admin to update
 * @return 200 - The updated question, 404 - Not found, 304 - Not Modified, 500 - Error
 */
adminRoutes.put(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    Admin.getAdminByUsername(req.params.username)
      .then(async (admin) => {
        if (!admin) {
          res.status(404).json({ message: 'Admin not found' });
          return;
        }
        try {
          // TODO: Make sure the username doesn't change and the password is hashed
          const updatedAdmin = new Admin(req.body);
          const result = await Admin.updateAdmin(updatedAdmin);
          result
            ? res.status(200).json(result)
            : res.status(304).json({ message: 'Admin not updated' });
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

/**
 * Delete an admin by username
 *
 * @route DELETE /admins/:id
 * @param username of the admin
 * @return 202 - The deleted admin, 404 - Not found, 500 - Error
 */
adminRoutes.delete(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    Admin.deleteAdminByUsername(req.params.username)
      .then((result) => {
        result
          ? res.status(202).json(result)
          : res.status(404).json({ message: 'Admin not found' });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

export default adminRoutes;
