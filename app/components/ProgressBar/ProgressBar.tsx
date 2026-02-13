import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useNavigation } from "react-router";

export function ProgressBar() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state !== "idle") {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [navigation.state]);

  return null;
}
