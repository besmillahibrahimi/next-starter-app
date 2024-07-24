import React from "react";

export class DialogBase implements IDialog {
  public key: string;
  public open: boolean;

  header?: {
    title?: string | React.ReactNode; // dialog title
    desc?: string | React.ReactNode;
  };
  content?: React.ReactNode;
  footer?: React.ReactNode;
  constructor() {
    this.key = Math.random().toString(36);
    this.open = true;
  }
}

export interface IDialog {
  header?: {
    title?: string | React.ReactNode; // dialog title
    desc?: string | React.ReactNode;
  };
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export class MyDialog extends DialogBase {
  // constructor();
  constructor(options?: IDialog) {
    super();
    this.header = options?.header;
    this.content = options?.content;
    this.footer = options?.footer;
  }
}
