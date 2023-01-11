import Express from 'express';
import { Admin } from '../models/admin';
import { isAuthenticated } from '../middleware/authentication';
import bcrypt from 'bcrypt';

const adminRoutes = Express.Router();
const saltrounds = 10;
const salt = bcrypt.genSaltSync(saltrounds);

/**
 * Determine logged in status
 *
 * @route POST /admins/isloggedin
 * @returns 401 - Unathorized, 200 - OK
 */
adminRoutes.get(
  '/isloggedin',
  isAuthenticated,
  function (req: Express.Request, res: Express.Response, next) {
    res.status(200).json();
  }
);

/**
 * Log in as an admin
 *
 * @route POST /admins/signin
 * @returns 304 - Found, 404 - Not found, 500 - Error
 */
adminRoutes.post(
  '/signin', // Robert Jonsson approves this route!
  function (req: Express.Request, res: Express.Response, next) {

    const username = req.body.username;
    const password = req.body.password;

    Admin.getAdminByUsername(username)
      .then((result) => {
        if (!(result && bcrypt.compareSync(password, result.password))) {
          res.status(404).json({ message: 'Incorrect credentials' });
          return;
        }

        req.session.regenerate((error) => {
          if (error) {
            next(error);
          }
          req.session.user = username;
          req.session.save((error) => {
            if (error) {
              return next(error);
            }
            res.status(200).json();
          });
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

/**
 * Sign out as an admin.
 * @route GET /admins/signout
 * @returns 200 - Signed out, 500 - Error
 */
adminRoutes.get(
  // Robert Jonsson approves this route!
  '/signout',
  function (req: Express.Request, res: Express.Response) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ message: 'Signed out' });
      }
    });
  }
);

/**
 * Sign up with a new admin.
 *
 * @route POST /admins
 * @return 201 - The new admin, 409 - Conflict, 400 - Invalid, 500 - Error
 */
adminRoutes.post(
  '/signup',
  function (req: Express.Request, res: Express.Response) {
    // const newAdmin = new Admin(req.body);

    const newAdmin = new Admin(req.body);
    newAdmin.password = bcrypt.hashSync(newAdmin.password, salt);

    console.log(newAdmin.password);

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
          res
            .status(400)
            .json({ message: 'New admin has an incorrect format' });
        } else {
          res.status(500).json({ message: error.message });
        }
      });
  }
);

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
 * Update an admin.
 *
 * @route PUT /admins/:username
 * @param username of the admin to update
 * @return 200 - The updated question, 404 - Not found, 304 - Not Modified, 500 - Error
 */
adminRoutes.put(
  '/:username',
  isAuthenticated,
  function (req: Express.Request, res: Express.Response) {
    Admin.getAdminByUsername(req.params.username)
      .then(async (admin) => {
        if (!admin) {
          res.status(404).json({ message: 'Admin not found' });
          return;
        }
        try {
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
  isAuthenticated,
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
