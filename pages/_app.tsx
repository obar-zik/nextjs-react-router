import { NextPageContext } from "next";
import { AppProps } from "next/app";

import { useEffect, useState } from "react";

function App({ Component, pageProps, ...rest }: AppProps, pop: any) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);

  console.log((rest as any).data);

  if (isServer) return null;

  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

App.getInitialProps = ({ ctx }: { ctx: NextPageContext }) => {
  const data = ctx.res?.getHeader("X-ORIGIN-PATH");
  ctx.res?.removeHeader("X-ORIGIN-PATH");
  return { data };
};
export default App;
