import React, { useCallback, useContext, useRef, useState } from "react";

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

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useMetadata = () => {
  const isLoading = useRef(false);
  const getMetadata = useCallback(async (): Promise<IMeta> => {
    isLoading.current = true;
    try {
      const response = await fetch(METADATA.URL);
      return sortObj(await response.json());
    } finally {
      isLoading.current = false;
    }
  }, []);

  return { isLoading: isLoading.current, getMetadata };
};

export const useLiveInfo = () => {
  const [info, setInfo] = useState<any>();

  const getInfo = useCallback(async () => {
    const response = await fetch("https://bhmnts.airtime.pro/api/live-info-v2");
    const data: any = await response.json();
    const newInfo = sortObj(data);
    if (JSON.stringify(newInfo) !== JSON.stringify(info)) {
      setInfo(newInfo);
    }
  }, [setInfo, info]);

  React.useEffect(() => {
    const t = setInterval(() => {
      getInfo();
    }, 1000);

    return () => clearInterval(t);
  }, [getInfo]);

  return { info };
};

export const AppProvider = (props) => {
  const [lang, setLang] = useState("en");
  const [showFooter, setShowFooter] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const { getMetadata, isLoading } = useMetadata();

  const [meta, setMeta] = React.useState<any>(props.meta);

  React.useEffect(() => {
    getMetadata().then(setMeta);
  }, [isLoading, getMetadata]);

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
