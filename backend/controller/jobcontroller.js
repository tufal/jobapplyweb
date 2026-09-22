import axios from "axios";

export const getJobs = async (req, res) => {
  try {
    const apiKey = process.env.INDIAN_API_KEY;

    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Jooble API key missing hai",
      });
    }

    const response = await axios.post(
      `https://jooble.org/api/${apiKey}`,
      {
        keywords: "it",
        location: "India",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

   

    return res.status(200).json({
      success: true,
      totalCount: response.data.totalCount || 0,
      jobs: response.data.jobs || [],
    });

  } catch (error) {
    console.error("JOOBLE ERROR:", error.message);

    if (error.response) {
      console.error("STATUS:", error.response.status);

      return res.status(error.response.status).json({
        success: false,
        message: "Jooble se jobs fetch nahi ho payi",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
    });
  }
};