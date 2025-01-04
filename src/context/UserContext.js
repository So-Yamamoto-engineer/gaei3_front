import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const login = (name) => setUsername(name); // ユーザー名をセット
  const logout = () => setUsername(null);   // ログアウト

  return (
    <UserContext.Provider value={{ username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Contextを簡単に利用できるカスタムフック
export const useUser = () => useContext(UserContext);
