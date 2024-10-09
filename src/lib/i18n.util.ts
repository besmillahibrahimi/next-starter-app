import * as _ from "lodash-es";

export function importI18nNamespace(
  language: string,
  namespace: string[] | string
) {
  if (typeof namespace === "string")
    return import(`../locales/${language}/${namespace}.json`);

  const nss = [];
  for (let n of namespace) {
    nss.push(import(`../locales/${language}/${n}.json`));
  }

  return nss.reduce((acc, cur) => {
    return _.map(acc, cur);
  }, {});
}
