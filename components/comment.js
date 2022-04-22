import { useState } from "react";

function Comment({ comments, article }) {
  const [styleForm, setStyleForm] = useState({
    display: "none",
  });

  var comment = {
    article: article,
    value: "",
  };

  const handleSubmit = function () {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((d) => {
        console.log(d);
      });
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setStyleForm({
            display: styleForm.display == "none" ? "block" : "none",
          });
        }}
      >
        Add Comment
      </button>
      <div>
        <textarea
          onChange={(text) => {
            comment.value = text.target.value;
          }}
        ></textarea>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <div>
        {comments.map((c) => {
          return <div>{c.value}</div>;
        })}
      </div>
    </div>
  );
}

export default Comment;
