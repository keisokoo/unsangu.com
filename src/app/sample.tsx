"use client";

import { useEffect, useState } from "react";

interface SampleProps {
  data: any;
}

export default function ClientComponent({ data }: SampleProps) {
  const [state, setState] = useState<any>();

  useEffect(() => {
    if (data) setState(data);
    return () => {
      setState(null);
    };
  }, [data]);

  return <div>{state}</div>;
}
const sample = `&populate[thumbnail][fields][0]=url&populate[thumbnail][fields][1]=width&populate[thumbnail][fields][2]=height&populate[thumbnail][fields][3]=hash`;
