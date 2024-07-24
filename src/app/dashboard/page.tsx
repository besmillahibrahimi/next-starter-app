"use client";

import { AlertType } from "@/components/molecules/AlertWrapper";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/contexts/GlobalLayout";
import { MyDialog } from "@/lib/types/dialog";
import { PromptDialog } from "@/lib/types/PromptDialog";
import { useState } from "react";

export default function Dashboard() {
  const [countState, setCountState] = useState<number>(1);

  const { showAlert, showDialog, closeDialog, dialogs } = useGlobal();

  const showMyAlert = () => {
    setCountState(countState + 1);
    showAlert({
      key: Math.random().toString(36),
      title: `----------         hiii  ${countState}     ----------- `,
      body: "    ",
      type: AlertType.Success,
    });
  };

  const showMyDialog100 = () => {
    console.log("---------", dialogs);
    const dialog = new MyDialog({
      header: {
        title: "first title",
        desc: "sdfj lkasdjf;lk asd;lfkj asdlkf j",
      },
      content: (
        <>
          <p>this is content</p>
        </>
      ),
      footer: (
        <div className="flex ">
          <Button onClick={() => onClickHooray()}>new dialog</Button>
          <Button
            onClick={() => {
              console.log(" mm 20 - - dialog   , ", dialog);
              console.log(" mm 20 - - dialogss   , ", dialogs);
              closeDialog(dialog.key);
            }}
          >
            Close me
          </Button>
          {/* <Button onClick={() => onclose()}>close</Button> */}
        </div>
      ),
    });
    showDialog(dialog);
  };

  const onClick = (value: any, key: string) => {
    console.log("input value......", value, key);
    closeDialog(key);
  };

  const onClickHooray = () => {
    showDialog(new PromptDialog("OK", { type: "text", maxLength: 5 }, onClick));
  };

  return (
    <main>
      <div className="w-[600px] h-[150px] flex justify-center place-items-center bg-blue-950 rounded-2xl hover:shadow-2xl">
        <h1>DASHBOARD </h1>
        <div className="flex justify-end ml-4">
          <Button className="bg-yellow-400 text-blue-950" onClick={showMyAlert}>
            Show Alert
          </Button>

          <Button
            className="bg-green-400 text-blue-950 ml-2"
            onClick={() => showMyDialog100()}
          >
            Show global Dialog ede
          </Button>
        </div>
      </div>
    </main>
  );
}
