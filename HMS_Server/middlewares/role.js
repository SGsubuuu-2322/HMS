const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.usertype)) {
      return res.status(403).json({
        message: "Access denied!!!",
      });
    }
    next();
  };
};

export default authorizeRoles;