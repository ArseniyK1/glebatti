import { Notify } from "quasar";

Notify.setDefaults({
  timeout: 3000,
  position: "bottom",
  textColor: "white",
  type: "positive",
  progress: true,
  color: "positive",
  actions: [{ icon: "close", color: "white" }],
});
