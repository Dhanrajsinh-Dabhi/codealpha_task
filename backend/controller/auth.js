// import User from "../models/user";

// // for login
// export const login = async (req, resp) => {
//     // console.log(req.body);
//     try {
//       const { email, password } = req.body;
//       //*Check if our database has user with that username
//       const user = await User.findOne({ email });
//       if (!user) return resp.status(400).send("user Does not exist");
  
//       //check password
//       const match_password = await comparePassword(password, user.password);
//       if (!match_password) return resp.status(400).send("Incorrect Password");
  
//       // create a jwt token
//     //   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     //     expiresIn: "7d",
//     //   }); // to create sign token
  
//       // we are not saving user password and secret
//       user.password = undefined;
//       user.secret = undefined;
  
//       resp.json({
//         // token,
//         user,
//       });
//     } catch (err) {
//       console.log("ERROR WHILE LOGIN =>", err);
//       return resp.status(400).send("Error, Try again");
//     }
//   };