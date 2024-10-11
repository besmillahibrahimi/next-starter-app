"use client";
import ListItem from "@/components/atoms/ListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INavMenu } from "@/lib/types/navbar";
import { isEmpty } from "lodash-es";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  menus: INavMenu[];
}

export const NavigationContent: React.FC<IProps> = ({ menus }) => {
  const [activeTab, setActiveTab] = useState(menus[0].key);
  return (
    <Tabs
      defaultValue={menus[0].key}
      value={activeTab}
      onValueChange={setActiveTab}
      className="h-[500px] min-w-60 flex flex-col"
      dir="rtl"
    >
      <TabsList className="flex bg-accent-50 rounded-none ">
        {menus.map((menu, index) => (
          <TabsTrigger
            value={menu.key}
            key={menu.key}
            onMouseEnter={() => setActiveTab(menu.key)}
          >
            {menu.key}
          </TabsTrigger>
        ))}
      </TabsList>
      {menus.map((menu, index) => (
        <TabsContent value={menu.key} key={menu.key}>
          <Link href={menu.href ?? "#"}>{menu.key}</Link>
          <nav>
            <ul>
              {menu?.menus?.map((subMenu: INavMenu, indx) => (
                <SubNavigation menu={subMenu} key={subMenu.key + indx} />
              ))}
            </ul>
          </nav>
        </TabsContent>
      ))}
    </Tabs>
  );
};

interface ISubMenuProps {
  menu: INavMenu;
}

const SubNavigation: React.FC<ISubMenuProps> = ({ menu }) => {
  return (
    <li>
      <Link
        href={menu.href ?? "#"}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        {menu.key}
      </Link>
      {!isEmpty(menu?.menus) && (
        <ul className="ps-3">
          {menu?.menus?.map((sub, index) => (
            <SubNavigation menu={sub} key={sub.key + index} />
          ))}
        </ul>
      )}
    </li>
  );
};
