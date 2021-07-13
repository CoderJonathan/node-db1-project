const accounts = require('./accounts-model');

exports.checkAccountPayload = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
        const name = req.body.name;
        const budget = req.body.budget;
        const error = { status: 400 }

        if (!name || !budget) {
          res.status(400).json({ message: "name and budget are required" });
          next(error)

        } else if (typeof name !== 'string') {
          res.status(400).json({ message: "name of account must be a string" });
          next(error)
          
        } else if (typeof budget !== 'number' || isNaN(budget)) {
          res.status(400).json({ message: "budget of account must be a number" });
          next(error)

        } else if (name.trim().length < 3 || name.trim().length > 100) {
          res.status(400).json({ message: "name of account must be between 3 and 100" });
          next(error)

        } else if (budget < 0 || budget > 1000000) {
          res.status(400).json({ message: "budget of account is too large or too small" });
          next(error)
          
        } else {
          req.body.name = name.trim();
          next();
        }

    } catch (err) {
          next(err);
    }
  }
}

exports.checkAccountNameUnique = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
        const currentAccounts = await accounts.getAll();
        const name = req.body.name.trim();

       const results = currentAccounts.filter((item) => {
          if ( item.name === name) {
            return item;
          }
        })
        if (results.length > 0) {
          res.status(400).json({ message: "that name is taken" });
        } else {
          next();
        }
      } catch (err) {
          next(err);
      }
  }
}

exports.checkAccountId = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
      const account = await accounts.getById(req.params.id)
        if (account) {
          req.account = account;
          next();
        } else {
          res.status(404).json({ message: "account not found" });
        }
    } catch (err) {
      next(err);
    }
  }
}
