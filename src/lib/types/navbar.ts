export interface INavMenu {
  key: string;
  href?: string;
  icon?: string;
  desc?: string;
  menus?: INavMenu[];
}
