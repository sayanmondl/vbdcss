import { Suspense } from "react";
import ErrorPage from "./ErrorContent";
import Loading from "./loading";

export default function ErrorPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorPage />
    </Suspense>
  );
}
