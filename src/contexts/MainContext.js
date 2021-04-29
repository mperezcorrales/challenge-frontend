import React from 'react'

const MainContext = React.createContext({});

export const MainContextProvider = MainContext.Provider;
export const MainContextConsumer = MainContext.Consumer;
export default MainContext;
