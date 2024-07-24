"use client";
import AlertWrapper, {
  IAlertOptions,
} from "@/components/molecules/AlertWrapper";
import { DialogBase as Modal } from "@/lib/types/dialogs";
import { isEmpty } from "lodash-es";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextData {
  alertData: IAlertOptions[] | [];
  showAlert: (options: IAlertOptions) => void;
  dialogs: Record<string, Modal>;
  showDialog: (options: Modal) => void;
  closeDialog: (key: string) => void;
}

const defaultValue: ContextData = {
  alertData: [],
  showAlert: (options) => {},
  dialogs: {},
  showDialog: (dialog: Modal) => {},
  closeDialog: (key: string) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [alertData, setAlertData] = useState<IAlertOptions[] | any[]>([]);
  const [dialogs, setDialogs] = useState<Record<string, Modal>>({}); // max 10

  const showAlert = (options: IAlertOptions | null | undefined) => {
    Array.isArray(alertData)
      ? setAlertData([...alertData, options])
      : setAlertData([]);
  };

  const showDialog = (dialog: Modal | null | undefined) => {
    console.log(" mm 10 - -  dialog - showDialog()  -    ", dialog);
    if (!dialog) return;

    setDialogs((m) => {
      const base =
        dialog instanceof Modal
          ? dialog
          : new Modal((key) => closeDialog(key), dialog);
      const n = { ...m, [base.key]: base };
      return n;
    });
  };

  const closeDialog = (key: string) => {
    console.log(".. closing dialog", key);
    // if (!Object.hasOwn(dialogs, key)) return;

    setDialogs((m) => {
      const temp = { ...m };
      const dialog = temp[key]!;
      dialog.open = false;
      temp[key] = dialog;
      setTimeout(() => {
        // this completely clear caches after 3 seconds. Adjust based on your need.
        setDialogs((ma) => {
          const t = { ...ma };
          delete t[key];
          return t;
        });
      }, 3000);
      return temp;
    });
  };

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
        ? Object.entries(dialogs).map(([_, value]) => {
            return value.render();
            // <Dialog
            //   key={key}
            //   open={value.open}
            //   onOpenChange={() => closeDialog(value.key!)}
            //   //closeDialog(item?.key)
            // >
            //   <DialogContent className="sm:max-w-[425px]">
            //     {value.header ? (
            //       <DialogHeader>
            //         <DialogTitle>{value.header.title}</DialogTitle>
            //         <DialogDescription>{value.header.desc}</DialogDescription>
            //       </DialogHeader>
            //     ) : null}

            //     {value.content}

            //     <DialogFooter>{value.footer}</DialogFooter>
            //   </DialogContent>
            // </Dialog>;
          })
        : null}

      {children}
    </GlobalContext.Provider>
  );
}
