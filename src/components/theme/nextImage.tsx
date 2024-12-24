/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";
import { FC } from "react";

const NextImage: FC<ImageProps> = ({ ...rest }) => {
  return (
    <Image width={100} height={100} alt="nextImage" {...rest} unoptimized />
  );
};

export default NextImage;
