import { dashboard } from "./dashboard";
import { sidebar } from "./sidebar";

const auth = {
  author: "Yoaz Aziz",
  imageUrl:
    "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  authorUrl:
    "https://unsplash.com/@yoavaziz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  imagePageUrl:
    "https://unsplash.com/photos/men-in-black-suits-standing-in-the-hallway-tKCd-IWc4gI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
};

export const siteConfig = {
  name: "Blog",
  title: "Sui Blog",
  description: "Simple blog created with Remix.",
  // links,
  unsplash: { auth },
  // oauthProviders,
  sidebarNav: [...sidebar.items],
  dashboardNav: [...dashboard.items],
};
