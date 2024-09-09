import Image from "next/image";
import Data from "./Data";

export default function Home() {
  return (
    <div className="flex justify-center items-center py-6">
      <Data />
    </div>
  );
}
