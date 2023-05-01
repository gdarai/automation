import { ReactNode } from 'react';
const context = require.context('@/', true, /\.fixture.tsx$/);

export type moduleItem = {
  name: string,
  element: ReactNode,
};

type moduleType = { [key: string]: ReactNode };

export type cacheItem = {
  name: string,
  fullName: string,
  module: moduleItem[],
};

const cache = [] as cacheItem[];

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((name: string) => {

    const nameSplit = name.split('/');
    const fileName = nameSplit[nameSplit.length - 1].replace('.fixture.tsx', '');
    const filePath = nameSplit.length > 2
      ? nameSplit.slice(1, -1).join(' / ')
      : '';

    const items = [] as moduleItem[];
    const entries = Object.entries(r(name).default as moduleType);

    entries.forEach(([key, entry]) => items.push({ name: key, element: entry }));

    cache.push({
      fullName: name,
      name: filePath+' : '+fileName,
      module: items,
    });
  });
}

importAll(context);

export default cache;
