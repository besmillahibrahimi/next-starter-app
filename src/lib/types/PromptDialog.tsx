import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { MyDialog } from "./dialog";

// Assuming MyDialog is defined elsewhere
export class PromptDialog extends MyDialog {
  private value?: string;

  constructor(
    btnTitle: string,
    InputProps: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    onClick: (value: any, key: string) => void
  ) {
    super();

    console.log(".......", this.key);
    this.content = (
      <div>
        <Input
          onChange={(e) => {
            this.value = e.target.value;
          }}
          {...(InputProps || {})}
        />
      </div>
    );
    this.footer = (
      <div>
        <Button onClick={() => onClick(this.value, this.key!)}>
          {btnTitle}
        </Button>
      </div>
    );
  }
}
