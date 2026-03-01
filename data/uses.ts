export interface UsesItem {
  name: string;
  description: string;
  link?: string;
}

export interface UsesCategory {
  name: string;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    name: "Editor & Terminal",
    items: [
      {
        name: "Neovim",
        description: "Primary editor with a custom Lua config.",
        link: "https://neovim.io",
      },
      {
        name: "Antigravity",
        description: "I will be unemployed soon.",
        link: "https://antigravity.google/",
      },
      {
        name: "VS Code",
        description: "Secondary editor for quick edits.",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Hyprland",
        description: "Tiling Wayland compositor on Arch.",
        link: "https://hyprland.org",
      },
      {
        name: "Zsh",
        description: "Shell of choice, I use it with OhMyZsh.",
        link: "https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH",
      },
    ],
  },
  {
    name: "OS",
    items: [
      {
        name: "Arch Linux",
        description: "Main daily-driver — btw.",
      },
      {
        name: "Windows",
        description: "Secondary OS.",
      },
      {
        name: "macOS",
        description: "On the MacBook Air M1.",
      },
    ],
  },
  {
    name: "Dev Tools",
    items: [
      {
        name: "lazygit",
        description: "Terminal UI for git that pairs nicely with Neovim.",
        link: "https://github.com/jesseduffield/lazygit",
      },
      {
        name: "DataGrip",
        description: "Database IDE for complex queries.",
        link: "https://www.jetbrains.com/datagrip/",
      },
      {
        name: "TablePlus",
        description: "Lightweight database client.",
        link: "https://tableplus.com",
      },
      {
        name: "GitKraken",
        description: "Visual git client — used occasionally.",
        link: "https://www.gitkraken.com",
      },
    ],
  },
  {
    name: "Hardware",
    items: [
      {
        name: "MacBook Air M1",
        description: "Portable laptop when going outside.",
      },
      {
        name: "ASUS VG27AQL1A",
        description: "Main display.",
      },
      {
        name: "Xiaomi Mi Monitor",
        description: "Secondary display.",
      },
      {
        name: "Keychron K3",
        description: "Low-profile wireless mechanical keyboard.",
      },
      {
        name: "Logitech G Pro Wireless",
        description: "Lightweight wireless gaming mouse.",
      },
    ],
  },
  {
    name: "Apps & Services",
    items: [
      {
        name: "Floorp",
        description: "Primary browser — Firefox-based.",
      },
      {
        name: "Discord",
        description: "Community and team chat.",
      },
      {
        name: "LINE",
        description: "Messaging.",
      },
      {
        name: "Slack",
        description: "Work chat — rarely.",
      },
      {
        name: "ClickUp",
        description: "Project management and task tracking.",
      },
      {
        name: "YouTube Music",
        description: "Music.",
      },
    ],
  },
  {
    name: "Socials & Gaming",
    items: [
      {
        name: "Discord",
        description: "34RTHY",
      },
      {
        name: "Steam",
        description: "34RTHY",
        link: "https://steamcommunity.com/id/34RTHY/",
      },
      {
        name: "osu!",
        description: "34RTHY",
        link: "https://osu.ppy.sh/users/34RTHY",
      },
    ],
  },
];
