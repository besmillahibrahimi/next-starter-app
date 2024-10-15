import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogContext } from "@/hooks/use-dialogs";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

interface Callback {
  (key: string): void;
}

export interface Dialog {
  close: Callback;
}

export interface IDialog {
  header?: {
    title?: React.ReactNode; // dialog title
    desc?: React.ReactNode;
  };
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export class DialogBase {
  body?: IDialog;

  public key: string;
  public open: boolean;
  public close?: Callback;

  constructor(body?: IDialog) {
    this.body = body;

    this.key = Math.random().toString(36);
    this.open = true;
  }

  render() {
    // this.close = closeDialog;
    return (
      <DialogContext.Consumer>
        {({ closeDialog }) => {
          this.close = closeDialog;
          return (
            <Dialog
              key={this.key}
              open={this.open}
              onOpenChange={() => {
                console.log("clicked close");
                closeDialog(this.key!);
              }}
              //closeDialog(item?.key)
            >
              <DialogContent className="sm:max-w-[425px]">
                {this.body?.header ? (
                  <DialogHeader>
                    <DialogTitle>{this.body.header.title}</DialogTitle>
                    <DialogDescription>
                      {this.body.header.desc}
                    </DialogDescription>
                  </DialogHeader>
                ) : null}

                {this.body?.content}

                {this.body?.footer ? (
                  <DialogFooter>{this.body?.footer}</DialogFooter>
                ) : null}
              </DialogContent>
            </Dialog>
          );
        }}
      </DialogContext.Consumer>
    );
  }
}

export class PromptDialog extends DialogBase {
  value?: string;
  constructor(
    btnTitle: string,
    callback: (value?: string) => void,
    InputProps: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) {
    super();

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
              this.close && this.close(this.key);
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
    content: React.ReactNode,
    Positive: React.ReactNode,
    Negative: React.ReactNode,
    callback: (value?: boolean) => void,
    ParentProps?: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  ) {
    super();

    this.body = {
      content,
      footer: (
        <div {...(ParentProps || {})}>
          <div
            onClick={() => {
              callback(true);
              this.close && this.close(this.key);
            }}
          >
            {Positive}
          </div>

          <div
            onClick={() => {
              callback(false);
              this.close && this.close(this.key);
            }}
          >
            {Negative}
          </div>
        </div>
      ),
    };
  }
}
