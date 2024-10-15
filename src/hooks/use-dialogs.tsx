"use client";

import isEmpty from "lodash-es/isEmpty";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DialogBase as Modal } from "@/lib/types/dialogs";

interface IProps {
  showDialog: (dialog: Modal | null | undefined) => void;
  closeDialog: (key: string) => void;
}

const defaultValue: IProps = {
  showDialog: (dialog: any) => {},
  closeDialog: (key: string) => {},
};

export const DialogContext = createContext<IProps>(defaultValue);
export const useDialog = () => useContext<IProps>(DialogContext);

export const withDialog = (Page: React.ComponentType) => {
  return function Component(props: any): React.ReactNode {
    const [dialogs, setDialogs] = useState<Record<string, Modal>>({}); // max 10

    const closeDialog = (key: string) => {
      console.log("-----", key);
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

    const showDialog = (dialog: Modal | null | undefined) => {
      if (!dialog) return;

      setDialogs((m) => {
        const base = dialog instanceof Modal ? dialog : new Modal(dialog);
        const n = { ...m, [base.key]: base };
        return n;
      });
    };

    const renderDialogs = useMemo(() => {
      return Object.entries(dialogs).map(([_, value]) => {
        return value.render();
      });
    }, [dialogs]);
    return (
      <DialogContext.Provider value={{ showDialog, closeDialog }}>
        {/* {!isEmpty(dialogs)
          ? Object.entries(dialogs).map(([_, value]) => {
              return value.render();
            })
          : null} */}
        {renderDialogs}
        <Page {...props} />
      </DialogContext.Provider>
    );
  };
};
