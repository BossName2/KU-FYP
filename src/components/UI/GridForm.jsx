import Action from "./Action";
import PropTypes from "prop-types";
import "./GridForm.scss";

const GridForm = ({
  rowTitle,
  columnTitle,
  row,
  column,
  onClickTrue,
  onClickFalse,
}) => {
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-column">. .</div>
        {columnTitle.map((item, index) => (
          <div key={index} className="grid-column">
            {item}
          </div>
        ))}
        {row.map((rowNum, index) => (
          <div key={index} className="grid-row">
            {rowTitle[index]}
            {column.map((item, index) => (
              <div key={index} className="grid-column">
                <Action.Tray>
                  <Action.Toggle
                    showText
                    onClickTrue={() => onClickTrue(rowNum, item)}
                    onClickFalse={() => onClickFalse(rowNum, item)}
                  />
                </Action.Tray>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
GridForm.propTypes = {
  columnTitle: PropTypes.array,
  rowTitle: PropTypes.array,
  column: PropTypes.array,
  row: PropTypes.array,
  onClickTrue: PropTypes.func,
  onClickFalse: PropTypes.func,
};
export default GridForm;
