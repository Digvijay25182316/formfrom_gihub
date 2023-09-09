import { CSVLink } from "react-csv";
import { useAppContext } from "../context/store";

const ExportCsv = ({ data }) => {
  const { dark } = useAppContext();
  return (
    <>
      <CSVLink data={data}>
        <button
          className={`mr-5 mt-10 px-4 py-1 rounded-lg ${
            dark ? "bg-gray-600" : "bg-gray-200"
          }`}
        >
          Export Csv
        </button>
      </CSVLink>
    </>
  );
};

export default ExportCsv;
