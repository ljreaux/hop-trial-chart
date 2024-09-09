import { useEffect, useState } from "react";
import Papa from "papaparse";
import lodash from "lodash";
export default function useParse(filePath: string) {
  const [data, setData] = useState<any[]>(null!);

  function sanitizeData(data: any[]) {
    const sanitized: any[] =
      data.map((row) => {
        const sanitizedObj: any = {};
        for (const [key, value] of Object.entries(row)) {
          if (!key.includes("_") && key !== '') {
            if (value !== "#N/A")
              sanitizedObj[lodash.camelCase(key)] = value;
          }
        }
        return sanitizedObj;
      });
    return sanitized;
  }

  useEffect(() => {
    Papa.parse(
      filePath,
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(sanitizeData(results.data));
        },
      }
    );
  }, [filePath])

  return data;
}