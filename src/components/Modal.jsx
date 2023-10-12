import React from "react";
import "../styles/feed.scss";
export default function Modal(props) {
  const convertDate = (timeStamp) => {
    const date = new Date(timeStamp * 1000);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  };
  let timePublished = convertDate(props.item?.node.last_update);
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div className="modal-box">
            <div className="individualBlock">
              <div className="leftSection">
                <img
                  src={props.item.node.field_photo_image_section}
                  alt={props.item.node.author_name}
                />
              </div>
              <div className="rightSection">
                <div className="title">
                  <h2>
                    <span>Title:</span>&nbsp;{props.item.node.title}
                  </h2>
                </div>
                <div className="date">
                  <p>
                    <strong>Author :</strong>&nbsp;
                    {props.item.node.author_name}
                  </p>
                  <p>
                    <strong>Published :</strong>&nbsp;
                    {timePublished}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
