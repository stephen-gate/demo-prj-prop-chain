import { useState } from "react";
import classes from "./EditForm.module.css";
import Button from "../UI/Button";

const EditForm = (props) => {

  const [enteredName, setEnteredName] = useState(props.appointments[0].name);
  const [enteredPhone, setEnteredPhone] = useState(props.appointments[0].phone);
  const [enteredTime, setEnteredTime] = useState(props.appointments[0].label);

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setEnteredPhone(event.target.value);
  };

  const handleTimeLabelChange = (event) => {
    setEnteredTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const editedAppointmentData = {
      name: enteredName,
      phone: enteredPhone,
      label: enteredTime,
    };

    props.onEditUpdate(editedAppointmentData);
    setEnteredName("");
    setEnteredPhone("");
  };

  const handleClickCancel = () => {
    props.onEditCancel();
  };

  return (
    <div className={classes.div_add_new_plate}>
      <form onSubmit={handleSubmit}>
        <div className={classes.div_title}>
          <h3>EDIT APPOINTMENT</h3>
        </div>
        <div className={classes.div_top}>
          <div className={classes.div_inputs}>
            <div className={classes.div_label_input}>
              <div>
                <label>Name </label>
              </div>
              <div>
                <input
                  className={classes.div_text_input}
                  type="text"
                  value={enteredName}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className={classes.div_label_input}>
              <div>
                <label>Phone </label>
              </div>
              <div>
                <input
                  className={classes.div_text_input}
                  type="text"
                  value={enteredPhone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.div_dropdown}>
            <div>
              <label>Time Slot</label>
            </div>
            <div>
              <select
                className={classes.dropdown_selector}
                value={enteredTime}
                onChange={handleTimeLabelChange}
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>
          </div>
        </div>

        <div className={classes.div_buttons}>
          <Button type="submit">UPDATE</Button>

          <Button type="button" onClick={handleClickCancel}>
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditForm;
