"use client";

import { Icon } from "@iconify/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";

interface Props {}

const langs = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "Persian",
    code: "fa",
  },
];

const LanguageSelection: React.FC<Props> = ({}) => {
  const cookie = cookies();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon color="var(--primary)" icon="iconoir:language" className="h-[1.2rem] w-[1.2rem] transition-all " />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {langs.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => cookie.set("locale", lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelection;
