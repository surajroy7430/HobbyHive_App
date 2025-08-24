import {
  Sidebar,
  useSidebar,
  SidebarRail,
  SidebarMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Layers,
  UserCog,
  Palette,
  CalendarSearch,
  LayoutDashboard,
  ArrowLeftFromLine,
  MessageCircleQuestionMark,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { DashboardLogo } from "./dashboard-logo";
import { useAuth } from "../context/AuthContext";

const menuButtons = {
  navMain: [
    {
      title: "Sections",
      path: "#",
      buttons: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Hobbies",
          path: "/hobbies",
          icon: Palette,
        },
        {
          title: "Resources",
          path: "/resources",
          icon: Layers,
        },
        {
          title: "Events",
          path: "/events",
          icon: CalendarSearch,
        },
      ],
    },
    {
      title: "Other",
      path: "#",
      buttons: [
        {
          title: "Settings",
          path: "/settings",
          icon: UserCog,
        },
        {
          title: "Help Center",
          path: "/help-center",
          icon: MessageCircleQuestionMark,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { open } = useSidebar();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain mainButtons={menuButtons.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem onClick={handleLogout}>
            <SidebarMenuButton
              tooltip={{ children: "Sign Out", hidden: open }}
              className="group/menu-button font-medium gap-3 h-9 rounded-md 
              bg-gradient-to-r hover:bg-transparent hover:from-destructive/20 
              hover:to-destructive/5 [&>svg]:size-auto hover:text-destructive/70"
            >
              <ArrowLeftFromLine
                size={20}
                aria-hidden="true"
                className="text-muted-foreground/70 group-hover/menu-button:text-destructive/70"
              />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
