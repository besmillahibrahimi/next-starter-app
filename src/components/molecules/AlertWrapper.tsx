import { createPortal } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export enum AlertType {
  Success,
  Warning,
  Error,
  Info,
}

export interface IAlertOptions {
  key: string;
  title?: string;
  body: string;
  type: AlertType;
  timeout?: number; // timeout in second
}

const AlertWrapper = ({ alertData }: { alertData: IAlertOptions[] }) => {
  return createPortal(
    <div className="fixed bottom-5 left-5">
      <div className="flex flex-col space-y-5">
        {alertData.map((item: IAlertOptions) => (
          <Alert key={item.key}>
            {item?.title ? <AlertTitle>{item?.title}</AlertTitle> : null}
            {item?.body ? (
              <AlertDescription>{item?.body}</AlertDescription>
            ) : null}
          </Alert>
        ))}
      </div>
    </div>,
    document?.body
  );
};

export default AlertWrapper;
