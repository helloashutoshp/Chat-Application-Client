import React from "react";
import { transFormImage } from "../../lib/Feature";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transFormImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"100px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
