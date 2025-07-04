import type { JSX } from "react";

export interface SideBarProps {
  items: {
    name: string;
    link: string;
    img: JSX.Element;
  }[];
}
export interface NavProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
}
