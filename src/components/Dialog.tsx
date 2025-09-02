import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogProps{
    children: ReactNode;
}

export function Dialog({ children }: DialogProps) {
    return <RadixDialog.Root>{children}</RadixDialog.Root>;
}

export function DialogTrigger({ children }: { children: ReactNode }) {
    return <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
}

export function DialogContent({ children }: { children: ReactNode }) {
    return (
        <RadixDialog.Portal>
            <RadixDialog.Overlay className="fixed inset-0 bg-black/40" />
            <RadixDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
                {children}
            </RadixDialog.Content>
            <RadixDialog.Close className="absolute right-3 top-3 text-gray-500 hover:text-black dark:hover:text-white">
                <X className="h-5 w-5" />
            </RadixDialog.Close>
        </RadixDialog.Portal>
    );
}

export function DialogHeader({ children }: { children: ReactNode }) {
    return <div className="mb-4 text-lg font-semibold">{ children }</div>
}

export function DialogFooter({ children }: { children: ReactNode }) {
    return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}