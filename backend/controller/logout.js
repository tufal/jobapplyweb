export const logout = (_req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful"
  });
};