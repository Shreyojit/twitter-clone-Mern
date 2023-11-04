import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tweetId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);



// import mongoose from "mongoose";

// const ReplySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     desc: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const CommentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     tweetId: {
//       type: String,
//       required: true,
//     },
//     desc: {
//       type: String,
//       required: true,
//     },
//     parentComment: {
//       type: mongoose.Schema.Types.ObjectId, // Reference to the parent comment
//       ref: 'Comment',
//     },
//     replies: [ReplySchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Comment", CommentSchema);
