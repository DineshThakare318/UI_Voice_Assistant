import { application } from "@/config/apis";
import axios from "axios";
import React, { useState } from "react";
import CustomToastEducation from "../Toast/CustomToastEducation";
import toast from "react-hot-toast";
import { ToastTypes } from "@/enum/ToastTypes";

interface StarRatingProps {
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
            fontSize: "28px",
            marginRight: "5px",
          }}
        >
          &#9733; 
        </span>
      ))}
    </div>
  );
};

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackStatus, setFeedbackStatus] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${application.baseUrl}/submit-feedback`,
        {
          feedback: feedback,
          rating: rating,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status == 200) {
        showAlert(response?.data?.message,ToastTypes.SUCCESS)
        setFeedbackStatus(true);
      }
      
    } catch (e: any) {
        showAlert(e.response.data?.error);
    }
  };

  const showAlert = (message: any, type?: any) => {
    toast(
      (t) => (
        <CustomToastEducation
          type={type}
          title=""
          message={message}
          t={t}
          singleLineMessage
          autoHide
        />
      ),
      {
        style: {
          background: "transparent",
          width: "auto",
          boxShadow: "none",
        },
      }
    );
  }

  return (
    <div className="flex justify-center">
      {feedbackStatus ? (
        <div className="flex justify-center items-center font-bold pl-40">Thank you for sharing your feedback.</div>
      ) : (
        <div className="flex flex-col justify-center items-center  ml-40">
          <h1 className="py-2 font-bold">Feedback</h1>
          <textarea
          className="border-2 border-black outline-none rounded-md py-2 px-2 h-40 w-72 my-2"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={handleFeedbackChange}
          />
          <StarRating onChange={handleRatingChange} />
          <button
            className=" outline-none border-2  border-green-500 rounded-md p-2 hover:bg-green-500 hover:text-white my-2"
            onClick={handleSubmit}
          >
            Submit feedback
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
