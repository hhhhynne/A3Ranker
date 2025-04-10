export type Navigation = {
  href: `/${string}`;
  title: string;
};

const navigation: Navigation[] = [
  {
    href: "/players",
    title: "Players",
  },
  {
    href: "/matches",
    title: "Matches",
  },
];

export default navigation;
