import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// Context修正例
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null); // userIdを追加

  const login = (name, id) => {
    setUsername(name);
    setUserId(id); // userIdをセット
  };

  const logout = () => {
    setUsername(null);
    setUserId(null); // userIdをリセット
  };

  return (
    <UserContext.Provider value={{ username, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


// Contextを簡単に利用できるカスタムフック
export const useUser = () => useContext(UserContext);
