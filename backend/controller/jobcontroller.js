import axios from "axios";

export const getJobs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jobs.indianapi.in/jobs",
      {
        headers: {
          "x-api-key": process.env.INDIAN_API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("API ERROR:", error.response?.data || error.message);

  res.status(error.response?.status || 500).json({
    success: false,
    message:
      error.response?.data?.message ||
      "Jobs fetch nahi ho payi",
  });
}
};