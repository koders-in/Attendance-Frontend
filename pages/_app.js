import DataProviderLayer from "../redux/Provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DataProviderLayer>
      <Component {...pageProps} />
    </DataProviderLayer>
  );
}

export default MyApp;
