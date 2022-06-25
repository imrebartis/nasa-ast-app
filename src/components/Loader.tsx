import * as React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const Loader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={770.5}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#989898"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
  </ContentLoader>
);

export default Loader;
