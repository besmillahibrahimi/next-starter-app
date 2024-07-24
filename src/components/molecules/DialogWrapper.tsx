import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/contexts/GlobalLayout";
import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

interface IDialogInput {
  name: string;
  label?: string;
}

interface IFooterButtons {
  onClick: () => void;
  title?: string;
  type: "button" | "submit" | "reset" | undefined; //   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

interface IDialogOptions {
  key: string;
  showButtonTitle?: string;
  dialogTitle: string;
  inputArray?: IDialogInput[];
  dialogDesc?: string;
  footerButtons?: IFooterButtons[];
  //openDialog?: boolean;
  //onOpenChange: () => void;
  setOpenDialog?: React.SetStateAction<any>;
  //test: React.SetStateAction<any>
}

const DialogWrapper = ({
  dialogData,
  isOpenDialog,
  setIsOpenDialog,
}: {
  dialogData: IDialogOptions[] | any[];
  isOpenDialog: boolean;
  setIsOpenDialog: React.SetStateAction<any>;
}) => {
  console.log(" kkkk  - --    ", dialogData);

  const { showDialog } = useGlobal();

  // const [isOpenDialog, setIsOpenDialog] = useState(false);
  const closeDialog = () => setIsOpenDialog(false);

  return (
    <>
      {dialogData.map((item: IDialogOptions) => {
        return (
          <Dialog open={isOpenDialog} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{item.dialogTitle}</DialogTitle>
                <DialogDescription>{item.dialogDesc}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {item.inputArray &&
                  item.inputArray.map((item: IDialogInput) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={item.name} className="text-right">
                          {item.label}
                        </Label>
                        <Input
                          id={item.name}
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                    );
                  })}
              </div>

              <DialogFooter>
                {item.footerButtons &&
                  item.footerButtons.map((item: IFooterButtons) => {
                    return (
                      <Button type={item.type} onClick={() => item.onClick()}>
                        {item.title}
                      </Button>
                    );
                  })}

                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
};

export default DialogWrapper;
