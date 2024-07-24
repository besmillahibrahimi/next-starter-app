"use client";
import _ from "lodash-es";
import AlertWrapper, {
  IAlertOptions,
} from "@/components/molecules/AlertWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogBase, IDialog, MyDialog } from "@/lib/types/dialog";
import { isEmpty } from "lodash-es";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextData {
  alertData: IAlertOptions[] | [];
  showAlert: (options: IAlertOptions) => void;
  dialogs: DialogBase[];
  showDialog: (options: IDialog) => void;
  closeDialog: (key: string) => void;
}

const defaultValue: ContextData = {
  alertData: [],
  showAlert: (options) => {},
  dialogs: [],
  showDialog: (dialog: IDialog) => {},
  closeDialog: (key: string) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [alertData, setAlertData] = useState<IAlertOptions[] | any[]>([]);
  const [dialogs, setDialogs] = useState<DialogBase[]>([]); // max 10

  const showAlert = (options: IAlertOptions | null | undefined) => {
    Array.isArray(alertData)
      ? setAlertData([...alertData, options])
      : setAlertData([]);
  };

  const showDialog = (dialog: IDialog | null | undefined) => {
    console.log(" mm 10 - -  dialog - showDialog()  -    ", dialog);
    if (!dialog) return;

    const base = dialog instanceof MyDialog ? dialog : new MyDialog(dialog);
    setDialogs((m) => [...m, base]);
  };

  const closeDialog = (key: string) => {
    // if (!exists) return;

    setDialogs((m) => {
      const exists = dialogs.find((d) => d.key === key);
      console.log(".. closing dialog", key, exists, dialogs, m);
      const temp = [...m];
      const dialog = temp.find((d) => d.key === key)!;
      dialog.open = false;
      setTimeout(() => {
        // this completely clear caches after 3 seconds. Adjust based on your need.
        setDialogs((ma) => {
          const t = [...ma].filter((d) => d.key !== key);

          return t;
        });
      }, 3000);
      return temp;
    });
  };

  useEffect(() => {
    console.log("after change", dialogs);
  }, [dialogs]);

  useEffect(() => {
    if (alertData) {
      alertData.forEach((item: IAlertOptions) => {
        setTimeout(() => {
          setAlertData((prevAlerts) =>
            prevAlerts.filter((alert) => alert.key !== item.key)
          );
        }, (item?.timeout ?? 3) * 1000);
      });
    }
  }, [alertData]);

  return (
    <GlobalContext.Provider
      value={{
        showAlert,
        alertData,
        showDialog,

        dialogs,
        closeDialog,
      }}
    >
      {alertData ? <AlertWrapper alertData={alertData} /> : null}

      {!isEmpty(dialogs)
        ? dialogs.map((value) => (
            <Dialog
              key={value.key}
              open={value.open}
              onOpenChange={() => closeDialog(value.key!)}
              //closeDialog(item?.key)
            >
              <DialogContent className="sm:max-w-[425px]">
                {value.header ? (
                  <DialogHeader>
                    <DialogTitle>{value.header.title}</DialogTitle>
                    <DialogDescription>{value.header.desc}</DialogDescription>
                  </DialogHeader>
                ) : null}

                {value.content}

                <DialogFooter>{value.footer}</DialogFooter>
              </DialogContent>
            </Dialog>
          ))
        : null}

      {children}
    </GlobalContext.Provider>
  );
}
