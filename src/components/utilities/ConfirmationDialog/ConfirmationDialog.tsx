import { forwardRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../unstyled/Dialog";
import Button from "../Button";

export interface ConfirmationDialogProps {
  heading?: string;
  TriggerComponent: React.ReactNode;
  cancelBtnText?: string;
  confirmBtnText?: string;
  description?: string;
  isConfirmingDialog?: boolean;
  handleOnConfirmation?: () => void;
}

const ConfirmationDialog = forwardRef<HTMLDivElement, ConfirmationDialogProps>(
  ({ heading, TriggerComponent, description, cancelBtnText, confirmBtnText, isConfirmingDialog, handleOnConfirmation }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild={true}>{TriggerComponent}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            {heading && <DialogTitle>{heading}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" disabled={isConfirmingDialog} size="sm" type="submit" onClick={() => setOpen(false)}>
              {cancelBtnText ?? "Cancel"}
            </Button>

            <Button size="sm" type="submit" loading={isConfirmingDialog} onClick={() => handleOnConfirmation && handleOnConfirmation()}>
              {confirmBtnText ?? "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ConfirmationDialog.displayName = "ConfirmationDialog";

export default ConfirmationDialog;
