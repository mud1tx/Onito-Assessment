import React from "react";
import { useSelector } from "react-redux";
import Step1Form from "./components/Step1Form";
import DataTable from "./components/DataTable";

const App = () => {
  const userData = useSelector((state: any) => state?.user?.users);
  
  return (
    <div>
      <Step1Form />
      <DataTable data={userData} />
    </div>
  );
};

export default App;
