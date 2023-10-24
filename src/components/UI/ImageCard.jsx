import { Card } from "./Card";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import "./ImageCard.scss";

export function ImageCard(key, imgUrl, title, subtitle) {
  console.log(`${subtitle}`);
  return (
    <div className="ImageCard">
      <Card key={key}>
        <div className="Title">{title}</div>
        <div className="Subtitle">{subtitle}</div>
        <img src={imgUrl} />
      </Card>
    </div>
  );
}
ImageCard.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }),
};

export default ImageCard;
