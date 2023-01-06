import Express from 'express';
import { Admin } from '../models/admin';

const adminRoutes = Express.Router();

// TODO: Make sure that passwords are hashed.

/**
 * Get an array of all admins from the database.
 *
 * @route GET /admins
 * @returns 200 - The admins, 404 - Not found
 */
adminRoutes.get('/', function (req: Express.Request, res: Express.Response) {
  Admin.getAdmins().then((result) => {
    if (result.length === 0) {
      res.status(404).json({ message: 'No admins found' });
      return;
    }
    res.status(200).json(result);
  });
});

/**
 * Get an admin by username.
 *
 * @route GET /admins/:username
 * @param username of the admin
 * @return 200 - The admin, 404 - Not found
 */
adminRoutes.get(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    const username = req.params.username;
    Admin.getAdminByUsername(username).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Admin not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

/**
 * Add a new admin.
 *
 * @route POST /admins
 * @return 201 - The new admin, 400 - Error
 */
adminRoutes.post('/', function (req: Express.Request, res: Express.Response) {
  const newAdmin = new Admin(req.body);
  Admin.addAdmin(newAdmin).then((result) => {
    if (!result) {
      res.status(400).json({ message: 'Admin not added' });
      return;
    }
    res.status(201).json(result);
  });
});

/**
 * Update an admin.
 *
 * @route PUT /admins/:username
 * @param username of the admin to update
 * @return 200 - The updated question, 404 - Not found, 400 - Error
 */
adminRoutes.put(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    Admin.getAdminByUsername(req.params.username).then((admin) => {
      if (!admin) {
        res.status(404).json({ message: 'Admin not found' });
        return;
      }
      // TODO: Make sure the username doesn't change and the password is hashed
      const updatedAdmin = new Admin(req.body);
      Admin.updateAdmin(updatedAdmin).then((result) => {
        if (!result) {
          res.status(400).json({ message: 'Admin not updated' });
          return;
        }
        res.status(200).json(result);
      });
    });
  }
);

/**
 * Delete an admin by username
 *
 * @route DELETE /admins/:id
 * @param username of the admin
 * @return 200 - The deleted admin, 404 - Not found
 */
adminRoutes.delete(
  '/:username',
  function (req: Express.Request, res: Express.Response) {
    Admin.deleteAdminByUsername(req.params.username).then((result) => {
      if (!result) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      res.status(200).json(result);
    });
  }
);

export default adminRoutes;
