"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { createContext, useContext, useEffect, useState } from "react";

export enum AlertType {
  Success,
  Warning,
  Error,
  Info,
}
interface IAlertOptions {
  title?: string;
  body: string;
  type: AlertType;
  timeout?: number; // timeout in second
}

interface ContextData {
  alertData: IAlertOptions | null;
  showAlert: (options: IAlertOptions) => void;
}

const defaultValue: ContextData = {
  alertData: null,
  showAlert: (options) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [alertData, setAlert] = useState<IAlertOptions | null>(null);

  const showAlert = (options: IAlertOptions | null) => {
    console.log("showing alert", alertData);
    if (alertData) return;
    setAlert(options);
  };

  useEffect(() => {
    if (alertData) {
      setTimeout(() => {
        setAlert(null);
      }, (alertData.timeout ?? 3) * 1000);
    }
  }, [alertData]);

  return (
    <GlobalContext.Provider
      value={{
        showAlert,
        alertData,
      }}
    >
      {alertData && (
        <div className="fixed bottom-3 left-3 z-[9999999]">
          <Alert>
            {alertData?.title ? (
              <AlertTitle>{alertData?.title}</AlertTitle>
            ) : null}
            {alertData?.body ? (
              <AlertDescription>{alertData?.body}</AlertDescription>
            ) : null}
          </Alert>
        </div>
      )}
      {children}
    </GlobalContext.Provider>
  );
}
