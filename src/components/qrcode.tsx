import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { fontSans } from "@/lib/fonts";

const QrCode = () => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xl bg-black hover:bg-white hover:text-black text-white" variant={"outline"}>QRCode</Button>
          </DialogTrigger>
          <DialogContent className={cn("min-w-[80%] h-4/5 font-sohne bg-ldgray text-white", fontSans.variable)}>
            <DialogHeader>
              <DialogTitle className="text-2xl">Toggle Outfitters</DialogTitle>
            </DialogHeader>
            <img src="/images/qrcode.png" alt="qrcode" className="w-1/2 2xl:w-1/3 mx-auto" />
          </DialogContent>
        </Dialog>
      );
}

export default QrCode;