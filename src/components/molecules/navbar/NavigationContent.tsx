"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INavMenu } from "@/lib/types/navbar";
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
      className="h-[500px] flex pt-8"
    >
      <TabsList className="flex flex-col">
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
          {menu?.menus?.map((subMenu: INavMenu, indx) => (
            <SubNavigation menu={subMenu} key={subMenu.key + indx} />
          ))}
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
    <div className="flex flex-col">
      <Link href={menu.href ?? "#"}>{menu.key}</Link>

      <ul className="ps-3">
        {menu?.menus?.map((sub, index) => (
          <li key={sub.key + index}>
            <SubNavigation menu={sub} />
          </li>
        ))}
      </ul>
    </div>
  );
};
