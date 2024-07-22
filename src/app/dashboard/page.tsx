"use client";
import { Button } from "@/components/ui/button";
import { AlertType, useGlobal } from "@/contexts/GlobalLayout";

export default function Dashboard() {
  console.log(" mm 110 - - -  dashboard page ");

  const { showAlert } = useGlobal();
  const showMyAlert = () => {
    showAlert({
      title: "hiiii from dashboard.tsx ",
      body: "    ",
      type: AlertType.Success,
    });
  };

  return (
    <main>
      <div className="w-[300px] h-[150px] flex justify-center place-items-center bg-blue-950 rounded-2xl hover:shadow-2xl">
        <h1>DASHBOARD . . . </h1>
        <div className="flex justify-end ml-4">
          <Button className="bg-yellow-400 text-blue-950" onClick={showMyAlert}>
            Show Alert
          </Button>
        </div>
      </div>
    </main>
  );
}
