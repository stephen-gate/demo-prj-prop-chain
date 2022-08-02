
import classes from "./AppointmentChart.module.css";
import AppointmentChartBar from'./AppointmentChartBar';

const AppointmentChart = (props) => {
  
  
// prettier-ignore
    const columnCount = [
      { id: 0, label: "08:00", total: 0 },
      { id: 1, label: "09:00", total: 0 },
      { id: 2, label: "10:00", total: 0 },
      { id: 3, label: "11:00", total: 0 },
      { id: 4, label: "12:00", total: 0 },
      { id: 5, label: "13:00", total: 0 },
      { id: 6, label: "14:00", total: 0 },
      { id: 7, label: "15:00", total: 0 },
      { id: 8, label: "16:00", total: 0 },
      { id: 9, label: "17:00", total: 0 },
      { id: 10, label: "18:00", total: 0 }
    ];

    for (const appointment of props.appointments) {
      for (const column of columnCount) {
        if (column.label === appointment.label ){
          ++column.total;
        }
      }
    }

    const handleBarClick = ( barSelectTime ) => {
      props.onSelectTime(barSelectTime);
    };



return (
  <div className={classes.div_chart_plate}>
        <div className={classes.div_title}>
          <h3>APPOINTMENT DISTRIBUTION</h3>
        </div>

        
        <div className={classes.div_title}>
          <h4>( Click on a time slot for appointment details. )</h4>
        </div>

        <div className={classes.div_bar_container}>
          
          {columnCount.map((column) => (
            <AppointmentChartBar 
            key={column.id}
            total={column.total}
            label={column.label}
            onBarClick={handleBarClick}
            />
          ))}

        </div>

      </div>
  );
};

export default AppointmentChart;
