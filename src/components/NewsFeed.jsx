import React, { useEffect, useState, useRef } from "react";
import "../styles/feed.scss";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingPage, setFetchingPage] = useState(1);
  const { isOpen, toggle } = useModal();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(page + 1); // Fetching next page
          setFetchingPage(page + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [page, fetchingPage]);

  // news feed fetch from api with error handling
  const fetchData = async (pageNumber) => {
    if (pageNumber !== fetchingPage) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${pageNumber}`,
          { method: "GET", mode: "cors" }
        );

        if (response.ok) {
          const data = await response.json();
          setNewsData((prevData) => [...prevData, ...data.nodes]);
          setPage(pageNumber);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // converting timestamp to readable date string
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
    // console.log(date.toLocaleString("en-US", options));
    return date.toLocaleString("en-US", options);
  };

  // title trim
  function trimTitle(string, maxLength = 60) {
    const trimmedString = string.trim();
    if (trimmedString.length > maxLength) {
      return trimmedString.substring(0, maxLength - 3) + "...";
    } else {
      return trimmedString;
    }
  }

  // Modal
  const openModal = (ele) => {
    setSelectedItem(ele);
    toggle(); // Opening  modal
  };

  return (
    <div className="feedSection">
      <h3>Your Feed</h3>
      <div className="feedBlock">
        {newsData &&
          newsData.map((ele) => {
            let timePublished = convertDate(ele.node.last_update);
            const trimmedString = trimTitle(ele.node.title);
            return (
              <div
                className="individualBlock"
                key={ele.node.nid}
                onClick={() => openModal(ele)}
              >
                <div className="leftSection">
                  <img
                    src={ele.node.field_photo_image_section}
                    alt={ele.node.author_name}
                  />
                </div>
                <div className="rightSection">
                  <div className="title">
                    <h2>{trimmedString}</h2>
                  </div>
                  <div className="date">
                    <p>{timePublished}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {loading && <p>Loading...</p>}
      </div>
      <Modal isOpen={isOpen} toggle={toggle} item={selectedItem}></Modal>

      <div ref={observerTarget}></div>
    </div>
  );
};

export default NewsFeed;
