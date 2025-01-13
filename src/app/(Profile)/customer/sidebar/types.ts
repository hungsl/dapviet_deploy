export interface MenuItemProps {
    icon: string;
    activeItem: string;
    id: string;
    label: string;
    isSidebarCollapsed: boolean;
    onClick?: () => void;
  }
  
  export interface SidebarProps {
    menuItems: MenuItemProps[];
    bottomMenuItems: MenuItemProps[];
    logoText: string;
    logoImage: string;
  }