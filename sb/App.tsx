import React, { useState, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeOptions } from '@/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { rqClient } from '@/services/rq';
import cache, { cacheItem } from './extractor';
import { Select } from './Select';

const geteList = (m: cacheItem) => m.module.map(e => e.name);
const mList = cache.map(m => m.name);
// const featureNames = features[featureKeys[0]] as string[];
// const feature = features[featureKeys[0]][featureNames[0]] as ReactNode;

const theme = createTheme(themeOptions);

function App() {

  const [ mIdx, setmIdx ] = useState(0);
  const [ eIdx, seteIdx ] = useState(0);
  const [ eList, seteList ] = useState(geteList(cache[0]!));

  const onmSelect = (idx: number) => {
    setmIdx(idx);
    seteIdx(0);
    seteList(geteList(cache[idx]!));
  };

  const oneSelect = (idx: number) => seteIdx(idx);

  return (
    <QueryClientProvider client={rqClient}>
      <ThemeProvider theme={theme}>
        <div>
          <div>
            <Select items={mList} index={mIdx} onSelect={onmSelect}/>
            <Select items={eList} index={eIdx} onSelect={oneSelect}/>
          </div>
          <div>
            {cache[mIdx]!.module[eIdx]!.element}
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
