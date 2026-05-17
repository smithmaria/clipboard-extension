import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getStorage, setStorage } from "./useStorage";

const FoldersContext = createContext(null);

export function FoldersProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getStorage('folders').then((result) => {
      setFolders(result.folders ?? []);
      setLoaded(true);
    })
  }, []);

  useEffect(() => {
    if (loaded) setStorage({ folders });
  }, [folders]);

  // FOLDER ACTIONS
  function addFolder(name) {
    setFolders((prev) => [...prev, { id: uuidv4(), name, clips: [] }]);
  }

  function renameFolder(folderId, newName) {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  }

  function reorderFolders(newOrder) {
    setFolders(newOrder);
  }

  function deleteFolder(folderId) {
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
  }

  // CLIP ACTIONS
  function addClip(folderId, content, isLatex = false) {
    const newClip = { id: uuidv4(), content, isLatex, createdAt: Date.now() };
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, clips: [...f.clips, newClip] } : f
      )
    );
  }

  function updateClip(folderId, clipId, updates) {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId
          ? { ...f, clips: f.clips.map((c) => (c.id === clipId ? { ...c, ...updates } : c)) }
          : f
      )
    );
  }

  function deleteClip(folderId, clipId) {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId
          ? { ...f, clips: f.clips.filter((c) => c.id !== clipId) }
          : f
      )
    );
  }

  return (
    <FoldersContext.Provider value={{
      folders,
      addFolder, renameFolder, reorderFolders, deleteFolder,
      addClip, updateClip, deleteClip,
    }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  return useContext(FoldersContext);
}
