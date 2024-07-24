import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

interface Callback {
  (key: string): void;
}

export interface Dialog {
  close: Callback;
}

export interface IDialog {
  header?: {
    title?: string | React.ReactNode; // dialog title
    desc?: string | React.ReactNode;
  };
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export class DialogBase {
  body?: IDialog;
  close: Callback;
  public key: string;
  public open: boolean;

  constructor(close: Callback, body?: IDialog) {
    this.body = body;
    this.close = close;
    this.key = Math.random().toString(36);
    this.open = true;
  }

  render() {
    return (
      <Dialog
        key={this.key}
        open={this.open}
        onOpenChange={() => this.close(this.key!)}
        //closeDialog(item?.key)
      >
        <DialogContent className="sm:max-w-[425px]">
          {this.body?.header ? (
            <DialogHeader>
              <DialogTitle>{this.body.header.title}</DialogTitle>
              <DialogDescription>{this.body.header.desc}</DialogDescription>
            </DialogHeader>
          ) : null}

          {this.body?.content}

          {this.body?.footer ? (
            <DialogFooter>{this.body?.footer}</DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }
}

export class PromptDialog extends DialogBase {
  value?: string;
  constructor(
    close: Callback,

    btnTitle: string,
    callback: (value?: string) => void,
    InputProps: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) {
    super(close);

    this.body = {
      content: (
        <div>
          <Input
            onChange={(e) => {
              this.value = e.target.value;
            }}
            {...(InputProps || {})}
          />
        </div>
      ),
      footer: (
        <div>
          <Button
            onClick={() => {
              callback(this.value);
              close(this.key);
            }}
          >
            {btnTitle}
          </Button>
        </div>
      ),
    };
  }
}

export class TagDialog extends DialogBase {
  value?: string;
  constructor(
    close: Callback,
    content: React.ReactNode,
    Positive: React.ReactNode,
    Negative: React.ReactNode,
    callback: (value?: boolean) => void,
    ParentProps?: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  ) {
    super(close);

    this.body = {
      content,
      footer: (
        <div {...(ParentProps || {})}>
          <div
            onClick={() => {
              callback(true);
              close(this.key);
            }}
          >
            {Positive}
          </div>

          <div
            onClick={() => {
              callback(false);
              close(this.key);
            }}
          >
            {Negative}
          </div>
        </div>
      ),
    };
  }
}
