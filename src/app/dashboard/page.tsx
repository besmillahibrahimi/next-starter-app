"use client";

import { AlertType } from "@/components/molecules/AlertWrapper";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/contexts/GlobalLayout";
import {
  DialogBase as Modal,
  PromptDialog as Prompt,
  TagDialog,
} from "@/lib/types/dialogs";
import { useState } from "react";
//import { useTranslation } from "react-i18next";
import { useTranslation } from "@/configs/i18n";

export default function Dashboard() {
  const [countState, setCountState] = useState<number>(1);

  const t = useTranslation("fa");

  const { showAlert, showDialog, closeDialog, dialogs, showLoading } =
    useGlobal();

  const showMyAlert = () => {
    setCountState(countState + 1);
    showAlert({
      key: Math.random().toString(36),
      title: `----------         hiii  ${countState}     ----------- `,
      body: "    ",
      type: AlertType.Success,
    });
  };

  const showMyLoading = () => {
    showLoading(true);
  };

  const showMyDialog100 = () => {
    console.log("---------", dialogs);
    const dialog = new Modal((key) => closeDialog(key), {
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
          <Button onClick={() => openPromptDialog()}>Input Value</Button>
          <Button onClick={() => openTagDialog()}>Logout</Button>
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
    // showDialog(new PromptDialog("OK", { type: "text", maxLength: 5 }, onClick));
  };
  const openPromptDialog = () => {
    showDialog(
      new Prompt((key) => closeDialog(key), "OK", console.log, {
        type: "text",
        maxLength: 5,
      })
    );
  };
  const openTagDialog = () => {
    showDialog(
      new TagDialog(
        (key) => closeDialog(key),
        "Do want to logout?",
        <Button className="bg-success-500">"Yes"</Button>,
        <Button className="bg-error-800">No</Button>,
        console.log,
        { className: "flex space-x-3 w-full justify-center" }
      )
    );
  };

  return (
    <main>
      <div className="w-[600px] h-[150px] flex-wrap justify-center place-items-center bg-blue-950 rounded-2xl hover:shadow-2xl">
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

          <Button
            className="bg-yellow-400 text-blue-950"
            onClick={showMyLoading}
          >
            Show Loading
          </Button>
        </div>
      </div>
    </main>
  );
}
