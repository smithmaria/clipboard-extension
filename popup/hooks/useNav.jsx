import { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_NAV = { view: 'folderList', folderId: null, clipId: null };

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [nav, setNav] = useState(DEFAULT_NAV);

  useEffect(() => {
    chrome.storage.session.get('nav', (result) => {
      setNav(result.nav ?? DEFAULT_NAV);
    });
  }, []);

  useEffect(() => {
    chrome.storage.session.set({ nav });
  }, [nav]);

  return <NavContext.Provider value={{ nav, setNav }}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
