
import classes from "./AppointmentChartBar.module.css";


const AppointmentChartBar = (props) => {

  const handleBarClick = () => {
    props.onBarClick(props.label);
  };

  return (
    <div
              id={props.id}
              className={classes.div_bar}
              onClick={handleBarClick}
            >
              <div
                className={classes.div_bar_element}
                style={{ height: props.total * 20 + 1 + "px" }}
              ></div>

              <div className={classes.div_bar_label}>{props.label}</div>
            </div>
  );
};

export default AppointmentChartBar;
