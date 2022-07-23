import classes from "./DetailBar.module.css";
import Button from "../UI/Button";

const DetailBar = (props) => {
  const handleUpdate = () => {
    props.onDetailUpdate(props.id);
  };

  const handleDelete = () => {
    props.onDetailDelete(props.id);
  };

  return (
    <div className={classes.detail_bar_element}>
      <div className={classes.detail_bar_three_texts}>
        <div className={classes.detail_bar_timestamp}>{props.label}</div>
        <div className={classes.detail_bar_name}>{props.name}</div>
        <div className={classes.detail_bar_phone}>{props.phone}</div>
      </div>
      <div className={classes.detail_bar_buttons}>
        <Button onClick={handleUpdate}>UPDATE</Button>
        <Button onClick={handleDelete}>DELETE</Button>
      </div>
    </div>
  );
};

export default DetailBar;
