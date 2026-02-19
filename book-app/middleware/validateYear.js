module.exports = function (req, res, next) {
  const { year } = req.body;

  const currentYear = new Date().getFullYear();

  if (!year || isNaN(year)) {
    return res.status(400).json({
      error: "Year must be a valid number",
    });
  }

  if (year < 1900 || year > currentYear) {
    return res.status(400).json({
      error: `Year must be between 1900 and ${currentYear}`,
    });
  }

  next();
};
