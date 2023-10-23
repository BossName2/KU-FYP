import { Card } from "./Card";
import { PropTypes } from "prop-types";

export function ImageCard(key, imgUrl, title, subtitle) {
  return (
    <div className="ImageCard">
      <Card key={key}>
        <p>{title}</p>
        <p>{subtitle}</p>
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
