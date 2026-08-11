declare module 'next/link' {
  import * as React from 'react';

  export type LinkProps = {
    href?: string | URL;
    as?: string | URL;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    children?: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

  const Link: React.ComponentType<LinkProps>;
  export default Link;
}
