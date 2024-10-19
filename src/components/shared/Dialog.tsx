"use client";

import useSetSearchParams from "@/hooks/useSetSearchParams";
import cn from "@/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

const Dialog = ({
  param,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  defaultOpen,
  children,
  ...props
}: DialogPrimitive.DialogProps & { param?: string }) => {
  const [open, setOpen] = React.useState(openProp || defaultOpen);
  const searchParams = useSearchParams();
  const { setSearchParams } = useSetSearchParams();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!param) return;
    if (searchParams.get(param) === "open") {
      setOpen(true);
      onOpenChangeProp?.(true);
    } else {
      setOpen(false);
      onOpenChangeProp?.(false);
    }
  }, [searchParams, param, defaultOpen, onOpenChangeProp]);

  React.useEffect(() => {
    if (param && defaultOpen)
      setSearchParams(
        (prev) => ({ ...prev, [param]: "open" }),
        "replace",
        true,
      );
  }, [defaultOpen, param, pathname, setSearchParams]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (param) {
        if (open) {
          setSearchParams(
            (prev) => ({ ...prev, [param]: "open" }),
            "push",
            true,
            { [param]: "open" },
          );
        } else {
          if (history.state[param] === "open") {
            history.go(-1);
          } else {
            setSearchParams(
              (prev) => {
                delete prev[param];
                return prev;
              },
              "replace",
              true,
              { [param]: "closed" },
            );
          }
        }
      } else {
        setOpen(open);
        onOpenChangeProp?.(open);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [param, onOpenChangeProp, pathname, setSearchParams],
  );

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </DialogPrimitive.Root>
  );
};

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 grid place-items-center bg-black/80 pt-12 duration-1000 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:py-10",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    overlayProps?: DialogPrimitive.DialogOverlayProps;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  }
>(({ className, header, footer, children, overlayProps, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay {...overlayProps}>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "relative flex h-full w-full flex-col rounded-t-lg border border-muted-foreground/25 bg-background shadow-lg duration-1000 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-[40%] data-[state=open]:slide-in-from-bottom-[40%] sm:rounded-lg md:h-auto md:max-w-lg",
          className,
        )}
        {...props}
      >
        {header}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer}
        <DialogPrimitive.Close className="focus:ring-ring absolute end-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon className="size-6 md:size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 border-b border-b-foreground/25 p-6 pb-3 text-center sm:text-start",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse p-6 sm:flex-row sm:justify-end sm:gap-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};

