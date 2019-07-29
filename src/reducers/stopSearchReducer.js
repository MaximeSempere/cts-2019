let loading = false;

const stopSearchReducer = (state, action) => {
  switch (action.type) {
    // Action : setLines
    case 'setLines':
      loading = true;
      let lines = action.data.LinesDelivery.AnnotatedLineRef.map((line) => {
        return {
          LineRef: line.LineRef,
          LineName: line.LineName,
          RouteType: line.Extension.RouteType
        }
      });

      if (state.stops.length > 0) {
        loading = false;
      }

      return {
        ...state,
        lines: lines,
        loading: loading
      };

    // Action : setStops
    case 'setStops':
      loading = true;
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

      if (state.lines.length > 0) {
        loading = false;
      }

      return {
        ...state,
        stops: stops,
        loading: loading
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

      if (typeof(action.data.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit) === 'undefined') {
        return {
          ...state,
          results: results
        }
      }

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
        results: results,
        loading: false
      }

    // Action : maxStopArrivalsSelection
    case 'maxStopArrivalsSelection':
      return {
        ...state,
        maxStopArrivals: action.data.maxStopArrivals
      }

    // Action : Loading
    case 'loading':
      return {
        ...state,
        loading: true
      }

    // Action : default
    default:
      throw new Error();
  }
};

export { stopSearchReducer };
