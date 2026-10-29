import { toast } from "@heroui/react";

// Resets a form and offers to restore the previous content from the toast.
export const resetWithUndo = <T>(previous: T, reset: () => void, restore: (value: T) => void) => {
  reset();
  const id = toast("Formulaire réinitialisé", {
    actionProps: {
      children: "Annuler",
      variant: "tertiary",
      onPress: () => {
        restore(previous);
        toast.close(id);
      },
    },
  });
};
