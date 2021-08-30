import React, { useState } from "react";

export const METADATA = {
  URL: `/api/metadata`,
  UPDATE_INTERVAL: 1000,
};

export const DEFAULT_THEME = "dark";

export interface IMeta {
  trackName?: string;
  customName?: string;
  imgUrl?: string;
  location?: string;
  theme?: string;
  t1Background?: string;
  t1Color?: string;
  t2Background?: string;
  t2Color?: string;
  actionColor?: string;
  size?: string;
  updatedAt?: string;
  text1?: string;
  text2?: string;
  link?: string;
  linkBackground?: string;
  linkColor?: string;
  linkTitle?: string;
  showSecondStream?: boolean;
  streamATitle?: string;
  streamBTitle?: string;
  streamUrl?: string;
}

interface IContext {
  isLoading: boolean;
  showFooter: boolean;
  showHeader: boolean;
  setLoading: (value) => void;
  setShowFooter: (val: boolean) => void;
  setShowHeader: (val: boolean) => void;
  setLang: (_value) => void;
  lang: string;
  meta: IMeta;
}

export const defaultAppContext = {
  isLoading: false,
  showFooter: false,
  showHeader: false,
  setLoading(value) {
    this.isLoading = value;
  },
  setShowFooter: (val: boolean) => {},
  setShowHeader: (val: boolean) => {},
  setLang: (_value) => {},
  lang: "",
  meta: {},
};

export const AppContext = React.createContext<IContext>(defaultAppContext);

export const AppProvider = (props) => {
  const [lang, setLang] = useState("en");
  const [art, setArt] = React.useState(null);
  const [showFooter, setShowFooter] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const isLoading = React.useRef(false);

  const [meta, setMeta] = React.useState<any>({
    text1: "",
    text2: "",
    trackName: "",
    imgUrl: null,
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      if (isLoading.current) return;
      isLoading.current = true;
      fetch(METADATA.URL)
        .then((response) => {
          return response.json().then((data) => {
            const newMeta = sortObj(data);
            if (JSON.stringify(newMeta) !== JSON.stringify(meta)) {
              setMeta(newMeta);
            }
          });
        })
        .catch((_err) => {})
        .finally(() => (isLoading.current = false));
    }, METADATA.UPDATE_INTERVAL);

    return () => clearInterval(id);
  }, [isLoading, meta]);

  function updateBackground(imgUrl) {
    const body = document?.getElementsByTagName("body")[0];
    if (!body) {
      return;
    }
    const newUrl = `url("${imgUrl}")`;
    if (body.style.backgroundImage !== newUrl) {
      body.style.backgroundImage = newUrl;
    } else if (!imgUrl) {
      body.style.backgroundImage = "";
    }
  }

  if (meta.imgUrl !== art) {
    setArt(meta.imgUrl);
    updateBackground(meta.imgUrl);
    setShowFooter(true);
  }

  if (!meta.streamUrl) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        ...defaultAppContext,
        meta,
        showFooter,
        setShowFooter: (val) => setShowFooter(val),
        setShowHeader: (val) => setShowHeader(val),
        showHeader,
        lang,
        setLang,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const sortObj = (obj) => {
  return Object.keys(obj || {})
    .sort()
    .reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
};
