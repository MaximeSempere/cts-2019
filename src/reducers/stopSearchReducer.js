const stopSearchReducer = (state, action) => {
  switch (action.type) {
    // Action : setLines
    case 'setLines':
      let lines = action.data.LinesDelivery.AnnotatedLineRef.map((line) => {
        return {
          LineRef: line.LineRef,
          LineName: line.LineName,
          RouteType: line.Extension.RouteType
        }
      });

      return {
        ...state,
        lines: lines
      };

    // Action : setStops
    case 'setStops':
      let stops = [];
      let stopsIds = {};

      action.data.ServiceDelivery.EstimatedTimetableDelivery.map((Etd) => {
        Etd.EstimatedJourneyVersionFrame.map((Ejvf) => {
          Ejvf.EstimatedVehicleJourney.map((Evj) => {
            let LineRef       = Evj.LineRef;
            let DirectionRef  = Evj.DirectionRef;
            let VehicleMode   = Evj.Extension.VehicleMode;

            Evj.EstimatedCalls.map((Ec) => {
              if (stopsIds[Ec.StopPointRef]) {
                return false;
              }

              stops.push({
                LineRef: LineRef,
                DirectionRef: DirectionRef,
                StopPointRef: Ec.StopPointRef,
                StopPointName: Ec.StopPointName,
                DestinationName: Ec.DestinationName,
                VehicleMode: VehicleMode
              });

              stopsIds[Ec.StopPointRef] = true;

              return false;
            });

            return false;
          });
          return false;
        });
        return false;
      });

      return {
        ...state,
        stops: stops
      };

    // Action : VehicleModeFilter
    case 'VehicleModeFilter':
      let VehicleMode = state.VehicleMode;
      VehicleMode[action.data.mode] = action.data.checked;

      return {
        ...state,
        VehicleMode: VehicleMode
      }

    // Action : LineSelection
    case 'LineSelection':
      return {
        ...state,
        line: action.data.line
      }

    // Action : StopSelection
    case 'StopSelection':
      return {
        ...state,
        stop: action.data.stop
      }

    // Action : DateSelection
    case 'DateSelection':
      return {
        ...state,
        date: action.data.date
      }

    // Action : Search
    case 'Search':
      let results = [];

      action.data.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.map((visit) => {
        let journey = visit.MonitoredVehicleJourney;
        let call = journey.MonitoredCall;

        results.push({
          DestinationName: journey.DestinationName,
          LineRef: journey.LineRef,
          VehicleMode: journey.VehicleMode,
          IsRealTime: call.Extension.IsRealTime,
          StopPointName: call.StopPointName,
          ExpectedArrivalTime: call.ExpectedArrivalTime,
          ExpectedDepartureTime: call.ExpectedDepartureTime
        });

        return false;
      });

      return {
        ...state,
        results: results
      }

      // Action : maxStopArrivalsSelection
      case 'maxStopArrivalsSelection':
        return {
          ...state,
          maxStopArrivals: action.data.maxStopArrivals
        }

    // Action : default
    default:
      throw new Error();
  }
};

export { stopSearchReducer };
