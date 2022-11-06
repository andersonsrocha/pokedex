import classNames from "classnames";
import { useState, ImgHTMLAttributes, useEffect } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export function Img(props: Props) {
  const { src, className, ...restProps } = props;

  const [img, setImg] = useState(src);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      setTimeout(() => {
        setImg(src);
        setLoading(false);
      }, 300);
    };
  }, [src]);

  return (
    <img
      src={img}
      {...restProps}
      className={classNames(className, { "blur-sm": loading, "blur-none": !loading })}
    />
  );
}
