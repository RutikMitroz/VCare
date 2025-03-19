import toast from "react-hot-toast";

type ToastType = "success" | "error" | "loading";

export default function showToast(msg: string, type: ToastType = "error") {
  toast[type](msg, {
    duration: 4000,
    position: "bottom-right",
  });
}
