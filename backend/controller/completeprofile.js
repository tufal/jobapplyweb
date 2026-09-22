import Profile from "../model/Profile";

export const completeprofile = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      education,
      skills,
      experience,
    } = req.body;

    
    if (
      !name ||
      !phone ||
      !location ||
      !education ||
      !skills ||
      !experience
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingProfile = await Profile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already completed",
      });
    }

    const profile = await Profile.create({
      user: req.user.id,
      name,
      phone,
      location,
      education,
      skills: skills.split(",").map(skill => skill.trim()),
      experience,
    });

    res.status(201).json({
      message: "Profile completed successfully",
      profile,
    });

  } catch (error) {
    console.log("Complete profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};