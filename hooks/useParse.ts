import { useEffect, useState } from "react";
import Papa from "papaparse";
import lodash from "lodash";
export default function useParse(filePath: string) {
  const [data, setData] = useState<any[]>(null!);
  const [filters, setFilters] = useState(data ? Object.keys(data[0]) : []);

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
          const data = sanitizeData(results.data)
          setData(data);
          setFilters(Object.keys(data[0]))
        },
      }
    );

  }, [filePath])

  const sortData = (filter: string) => {
    if (!filters.length) return



    const sorted = data.sort((a, b) => {
      const valA = a[filter]
      const valB = b[filter]

      if (!valB) return -1
      if (!valA) return 1

      if (filter !== "hops") return parseFloat(valB) - parseFloat(valA)
      return valA.toLowerCase().localeCompare(valB.toLowerCase())
    });


    setData(sorted);
  }


  return { data, filters, sortData };
}