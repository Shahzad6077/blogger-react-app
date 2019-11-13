import React from "react";
import { Avatar } from "antd";

const AvatarComp = props => {
  let styleAvatar = {
    backgroundColor: "#4C96D7",
    verticalAlign: "middle",
    display: "flex",
    margin: "10px auto"
  };
  if (props.style !== undefined) {
    styleAvatar = {
      ...styleAvatar,
      ...props.style
    };
  }

  return (
    <Avatar style={styleAvatar} size={60}>
      {props.title}
    </Avatar>
  );
};

export default AvatarComp;
