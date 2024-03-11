const { updateUserProfileService } = require("../services");
exports.updateUserProfile = async (req, res) => {
  try {
    console.log("user update")
    const response = await updateUserProfileService.updateUserProfile(req);
    res.status(200).json(response);
  } catch (error) {
    console.log("update user error")
    console.log(error);
    res.status(500).json(error);
  }
};
exports.allUser = async (req, res) => {
  try {
    const response = await updateUserProfileService.allUser(req);
    res.status(200).json({
      success: true,
      userData: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const response = await updateUserProfileService.getUser(req);
    if (response == "User Not Found") {
      return res.status(400).json({ response });
    } else {
      return res.status(201).json({ response });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addNewUser=async(req,res)=>{
    try{
        const response= await updateUserProfileService.addNewUser({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        instituteName:req.body.instituteName,
        address:req.body.address
        })
        console.log("addUser",response)
        return res.status(201).json({
            success:true,
            message:"user added successfully",
            user:response.user
        })
       
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);

    }
}
