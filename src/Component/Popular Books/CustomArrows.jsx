import PropTypes from 'prop-types'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <BsArrowLeftCircleFill className='z-30 text-purple-700 text-6xl '/>
    </div>
  );
}

export function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <BsArrowRightCircleFill className='z-30 text-blue-300 text-6xl '/>
    </div>
  );
}

CustomPrevArrow.propTypes = {
    className:PropTypes.node, 
    style:PropTypes.node, 
    onClick:PropTypes.node,
};
CustomNextArrow.propTypes = {
    className:PropTypes.node, 
    style:PropTypes.node, 
    onClick:PropTypes.node,
};