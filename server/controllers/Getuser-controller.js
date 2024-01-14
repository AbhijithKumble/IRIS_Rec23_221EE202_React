const getUser = async (req, res, next) => {

  const userId = req.id;
  let user;
  
  return res.status(200).json({ user });

};

export default getUser;