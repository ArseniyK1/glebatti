import { Dialog } from "quasar";

export const confirmDialog = (
  {
    title = "Подтверждение",
    message = "Вы действительно хотите выполнить это действие",
    labelAccept = "Ок",
    labelCancel = "Отмена",
  },
  cb,
  dismiss = null,
  cancel = null
) => {
  Dialog.create({
    title: title,
    message: message,
    dark: true,
    cancel: {
      color: "secondary",
      label: labelCancel,
      outline: true,
      zIndex: 10000,
    },
    ok: {
      color: "secondary",
      outline: true,
      label: labelAccept,
    },
    persistent: true,
  })
    .onOk(() => (!!cb && typeof cb === "function" ? cb() : null))
    .onDismiss(() =>
      !!dismiss && typeof dismiss === "function" ? dismiss() : null
    )
    .onCancel(() =>
      !!cancel && typeof cancel === "function" ? cancel() : null
    );
};
