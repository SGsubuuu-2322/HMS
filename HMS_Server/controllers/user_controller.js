export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(201).send({
      message: "User registration successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
