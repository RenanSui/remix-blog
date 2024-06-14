import { ExitIcon, GearIcon, HomeIcon, SunIcon } from "@radix-ui/react-icons";
import {
  ChevronLeftIcon,
  ChevronsUpDown,
  CircleUserRoundIcon,
  LogInIcon,
  Search,
  UsersRoundIcon,
} from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  // lucid-react
  search: Search,
  logInIcon: LogInIcon,
  chevronLeft: ChevronLeftIcon,
  chevronsUpDown: ChevronsUpDown,
  social: UsersRoundIcon,
  user: CircleUserRoundIcon,
  
  // radix-ui
  home: HomeIcon,
  sun: SunIcon,
  exitIcon: ExitIcon,
  gear: GearIcon,

  // svgs
  logo: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
