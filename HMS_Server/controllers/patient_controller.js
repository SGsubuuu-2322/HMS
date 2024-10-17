export const getPatDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Patient",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Patient",
      message: "Error in req/res cycle testing...",
    });
  }
};
