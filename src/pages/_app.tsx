import { CanvasProvider } from '../contsxts/canvas';

function MyApp({ Component, pageProps }) {
  return (
    <CanvasProvider>
      <Component {...pageProps} />
    </CanvasProvider>
  );
}

export default MyApp;
