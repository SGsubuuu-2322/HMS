export const getAdDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Admin",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Admin",
      message: "Error in req/res cycle testing...",
    });
  }
};
