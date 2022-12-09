import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/newstyle.css";
import "./assets/css/responsive.css";
import "./assets/fontawesome/css/all.css";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import {Provider} from 'react-redux';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/web3Library";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from "redux/Store";
import { BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  }
});

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

        </PersistGate>
      </Provider>
    </QueryClientProvider>

  </Web3ReactProvider>

);
reportWebVitals();
