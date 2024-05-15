import { useSubmit, useFetcher } from "react-router-dom";
import React from "react";

const useDelete = (href: string) => {
  const submit = useSubmit();
  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    submit(
      {},
      {
        method: "DELETE",
        action: `${href}/delete`,
        navigate: false,
      },
    );
  };
  return onSubmit;
};

const useFetcherData = (url: string) => {
  const fetcher = useFetcher({ key: url });
  React.useEffect(() => {
    fetcher.load(`../${url}`);
  }, []);
  return fetcher;
};

export { useDelete, useFetcherData };
