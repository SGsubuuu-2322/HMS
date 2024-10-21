export const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const user = await 
    return res.status(201).send({
      message: "User registration successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
