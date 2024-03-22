import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Package2Icon, SearchIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center gap-4">
      <Link className="flex items-center gap-2 font-semibold" href="#">
        <Package2Icon className="h-6 w-6" />
        <span className="">Task Manager</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <form className="flex items-center gap-4">
          <Label className="sr-only" htmlFor="search">
            Search
          </Label>
          <Input
            className="w-72"
            id="search"
            placeholder="Search tasks..."
            type="search"
          />
          <Button className="ml-auto h-8 w-8" size="icon">
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border w-8 h-8 dark:border-gray-800"
              size="icon"
            >
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
