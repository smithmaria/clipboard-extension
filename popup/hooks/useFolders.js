import { useEffect, useState } from "react";
import { getStorage, setStorage } from "./useStorage";

export function useFolders() {
  const [folders, setFolders] = useState([]);

  // Load folders on mount
  useEffect(() => {
    getStorage('folders').then((result) => {
      setFolders(result.folders ?? []);
    })
  }, []);

  // Keep chrome storage updated when folders changes
  useEffect(() => {
    if (folders.length > 0) {
      setStorage({ folders });
    }
  }, [folders])

  
  // FOLDER ACTIONS
  function addFolder(name) {
    setFolders((prev) => [...prev, { id: uuidv4(), name, clips: [] }]);
  }

  function renameFolder(folderId, newName) {
    setFolders((prev) => 
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
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
          ? {
              ...f,
              clips: f.clips.map((c) =>
                c.id === clipId ? { ...c, ...updates } : c
              ),
            }
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

  return {
    folders,
    addFolder, renameFolder, deleteFolder,
    addClip, updateClip, deleteClip,
  };
}