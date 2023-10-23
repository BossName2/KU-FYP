import { Card } from "./Card";

export function ImageCard(imgUrl, title, subtitle) {
  return (
    <div className="ImageCard">
      <Card>
        <p>{title}</p>
        <p>{subtitle}</p>
        <img src={imgUrl} />
      </Card>
    </div>
  );
}
export default ImageCard;
