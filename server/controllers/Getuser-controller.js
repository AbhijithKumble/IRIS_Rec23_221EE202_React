const getUser = async (req, res, next) => {
    console.log(req);
    const userId = req.id;
    console.log(userId);
    let user;
    try {
      
      console.log(user);
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
};

export default getUser;