import 'tailwindcss/tailwind.css';
import * as React from 'react';
import { MachineProvider } from '../context/machine';

function App({ Component, pageProps }) {
  // console.log(MachineProvider);
  return (
    <MachineProvider>
      <Component {...pageProps} />
    </MachineProvider>
  );
}

export default App;
