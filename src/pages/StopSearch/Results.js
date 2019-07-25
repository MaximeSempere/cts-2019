import React, { useContext } from 'react';
import { StopSearchContext } from '../../providers/stopSearchProvider';
import MUIDataTable from "mui-datatables";
import TableFooter from "@material-ui/core/TableFooter";
import moment from 'moment';

import Timer from "./Timer";

const Results = () => {
  const { state: { results } } = useContext(StopSearchContext);

  const options = {
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    selectableRows: 'none',
    rowsPerPage: 100,
    customFooter: (
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage
    ) => {
      return <TableFooter></TableFooter>;
    }
  };

  const columns = [
    "Ligne",
    "Arrêt",
    "Destination",
    "Temps réel",
    "Arrivée",
    "Départ",
    "Arrivée dans",
    "Départ dans"
  ];

  const data = results.map((result) => {
    let element = [
      result.VehicleMode+' '+result.LineRef,
      result.StopPointName,
      result.DestinationName,
      result.IsRealTime === true ? "Oui" : "Non",
      moment(result.ExpectedArrivalTime).format('DD/MM/YYYY HH:mm:ss'),
      moment(result.ExpectedDepartureTime).format('DD/MM/YYYY HH:mm:ss'),
      <Timer date={result.ExpectedArrivalTime} finishedText="Arrivé" />,
      <Timer date={result.ExpectedDepartureTime} finishedText="Passé" />
      //moment.utc(moment(result.ExpectedArrivalTime).diff(moment())).format("HH:mm:ss")
    ];

    return element;
  });

  if (results.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <br />
      <MUIDataTable
        title={"Liste des horaires"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default Results;
