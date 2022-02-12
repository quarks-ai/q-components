import React from "react"

function useCreateContext(name: string, defaultValue?: any) {
  const Context = React.createContext(defaultValue?.() || defaultValue)
  Context.displayName = name

  function Provider({ children, get, ...props }: any) {
    const value = get?.(props) || { get, ...props }
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  Provider.displayName = name + "_Provider"

  function useContext() {
    const context = React.useContext(Context)

    return (
      context ?? defaultValue ?? console.error("Context value not provided")
    )
  }

  return [Provider, useContext] as const
}

const createContext = useCreateContext

export { createContext, useCreateContext, useCreateContext as default }
