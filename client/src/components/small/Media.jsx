import React from "react";
import { Carousel, Image } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import Loader from "./Loader";

const Media = ({ media }) => (
  <Carousel>
    {media.map((file, _) => (
      <Carousel.Item
        key={_}
        fade={true}
        pause={true}
        interval={100000}
        slide={false}
      >
        {["mp4", "mpg", "mov"].includes(
          file.substring(file.length - 3, file.length)
        ) ? (
          <ReactPlayer
            url={`uploads/${file}`}
            controls={true}
            pip={true}
            fallback={<Loader />}
          />
        ) : (
          <Image
            className="card-img"
            src={`uploads/${file}`}
            alt={file}
            fluid
          />
        )}
      </Carousel.Item>
    ))}
  </Carousel>
);

export default Media;
