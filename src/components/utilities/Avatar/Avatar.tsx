import React from "react";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const avatarVariants = cva("rounded-full", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-5 w-5",
      md: "h-7 w-7",
      lg: "h-10 w-10",
    },
    variant: {
      rounded: "rounded-full",
      square: "rounded-md",
    },
    background: {
      transparent: "ring-2 ring-gray-200",
      colored: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AvatarProps {
  imageUrl?: string;
  Icon?: React.ReactNode;
  text?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "square" | "rounded";
  background?: "transparent" | "colored";
  style?: React.CSSProperties;
}

const colors = ["#c2175b", "#7b1ea2", "#7e57c2", "#5472E4", "#004d41", "#679f38", "#0097a7", "#ef6c00", "#8d6e63", "#191919"];

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { onClick, text, imageUrl, alt, children, size = "md", variant = "square", Icon, background = "transparent", style } = props;

  let hash = 1;
  const length = text?.length || 0;
  for (let i = 0; i < length; i++) {
    if (text) hash += text.charCodeAt(i);
  }
  const backgroundColor = background === "colored" ? colors[hash % 10] : "";

  return (
    <div
      style={{ ...style, backgroundColor }}
      onClick={onClick}
      ref={ref}
      className={cn("relative", avatarVariants({ size, variant, background }), clsx({ "cursor-pointer hover:ring-gray-400 duration-300": onClick }))}
    >
      {children && children}

      {imageUrl ? (
        <img
          className={clsx("w-full h-full align-baseline", {
            "rounded-full": variant === "rounded",
            "rounded-md": variant === "square",
          })}
          src={imageUrl}
          alt={alt}
        />
      ) : Icon ? (
        <div className="flex items-center justify-center w-full h-full">{Icon}</div>
      ) : (
        <span
          className={clsx("flex items-center justify-center uppercase w-full h-full", {
            "text-white font-light": background === "colored",
            "text-black font-semibold": background === "transparent",
          })}
        >
          {text?.substring(0, 1)}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";
export { avatarVariants };
export default Avatar;
