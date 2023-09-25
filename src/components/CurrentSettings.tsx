"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DollarSign, Share2 } from "lucide-react";
import { QRCode } from "./ui/qrcode";

export type CurrentSettingsProps = {
  buttonSize?: number;
};

export function CurrentSettings(props: CurrentSettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Share2 size={props.buttonSize ?? 16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share your current settings with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              window.navigator.clipboard
                .writeText(window.location.href)
                .catch(console.error);
            }}
          >
            Copy to clipboard
          </Button>
          <QRCode
            contents={typeof window !== "undefined" ? window.location.href : ""}
          >
            <div className="flex justify-center pr-1 pb-2">
              <DollarSign size={36}/>
            </div>
          </QRCode>
        </div>
      </DialogContent>
    </Dialog>
  );
}
