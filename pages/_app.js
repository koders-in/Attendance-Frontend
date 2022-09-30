import App from "next/app";
import "../styles/globals.css";
import reduxStore from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = reduxStore();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default MyApp;
