
import classes from "./AddNewButton.module.css";
import Button from "../UI/Button";

const AddNewButton = (props) => {
 
const handleAddNew = () => {
    props.onAddNewClick();
  };

  return (
    <div>
      <div className={classes.div_button_plate}>
        <Button 
        onClick={handleAddNew}>
          ADD NEW APPOINTMENT
        </Button>
      </div>
    </div>
  );
};

export default AddNewButton;
