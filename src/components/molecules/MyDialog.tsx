import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface IMyDialog {
  dialogTrigger?: React.ReactNode;
  dialogTitle: string;
  dialogDes: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const MyDialog: React.FC<IMyDialog> = ({
  dialogTrigger,
  dialogTitle,
  dialogDes,
  body,
  footer,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="place-self-start">{dialogTitle}</DialogTitle>
          <DialogDescription className="place-self-start">
            {dialogDes}
          </DialogDescription>
        </DialogHeader>

        {body}

        <DialogFooter className="flex-row justify-end space-x-2">
          {footer}
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
