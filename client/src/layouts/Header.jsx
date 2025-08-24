import { MENU_MAP } from "@/constants";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "../components/nav-user";

const Header = () => {
  const { pathname } = useLocation();

  const currentTitle =
    Object.keys(MENU_MAP).find((path) => pathname.startsWith(path)) || "";
  const title = MENU_MAP[currentTitle] || "";

  return (
    <header className="sticky top-0 z-40 mb-4 border-b flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-sm font-medium text-muted-foreground cursor-default">
          {title}
        </h1>

        <div className="ml-auto">
          <NavUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
