import { MENU_MAP } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell, CircleGauge } from "lucide-react";
import { NavUser } from "../components/nav-user";
import Notifications from "../components/notifications";

const Header = () => {
  const { pathname } = useLocation();

  const currentTitle =
    Object.keys(MENU_MAP).find((path) => pathname.startsWith(path)) || "";
  const title = MENU_MAP[currentTitle] || "";

  return (
    <header
      className="sticky top-0 z-40 mb-4 border-b flex h-16 shrink-0 items-center 
      gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
      transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ms-2" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hidden md:block">
                <Link to="/dashboard">
                  <CircleGauge size={16} aria-hidden="true" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator className="hidden md:block" />
              <span className="cursor-default">
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex gap-3 items-center">
          <Notifications />
          <NavUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
