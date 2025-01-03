
import Review from "../../model/Review.js"

export const addReviewRating = async (req, res) => {
  try {
    const { productId, userId, name, reviewMessage} = req.body;

     if (!productId || !userId || !name || !reviewMessage) {
       return res.status(400).json({ success: false, message: "All fields are required." });
     }

    const newReview = new Review({
      productId,
      userId,
      name,
      reviewMessage,
    });

    await newReview.save();

    res.status(200).json({ success: true, data: newReview });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Failed to Delete" });
  }
};

export const getReviewRating = async (req, res) => {
  try {
    const { productId } = req.params;

    const review = await Review.find({ productId });

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Failed to Load" });
  }
};
