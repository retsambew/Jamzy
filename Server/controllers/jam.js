export const findPair = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
