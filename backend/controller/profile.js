import User from "../model/User.js";

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
  console.log("PROFILE ERROR:", error);

  return res.status(500).json({
    message: "Server error",
    error: error.message
  });
}
};