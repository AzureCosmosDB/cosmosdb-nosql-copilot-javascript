import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
    theme={theme as ToasterProps["theme"]}
    className="toaster group"
    toastOptions={{
      classNames: {
        // Default toast styles
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        // Custom class for loading toasts
        loading: "group-[.toast-loading]:bg-blue-100 group-[.toast-loading]:text-blue-900",
      },
    }}
      {...props}
    />
  )
}

export { Toaster }
