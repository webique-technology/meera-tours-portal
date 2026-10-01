"use client";

import { useEffect, useState } from "react";

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    Promise.resolve()
      .then(fetcher)
      .then((result) => {
        if (!active) return;
        setData(result?.data ?? result);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Unable to load data right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
