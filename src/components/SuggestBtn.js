import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Modal, Button } from 'react-bootstrap';
import WarmOutfit from './WarmOutfit';
import RainOutfit from './RainOutfit';
import SummerOutfit from './SummerOutfit';
import WinterOutfit from './WinterOutfit';
// import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2>Suggested clothing:</h2>
        {props.tpye === "Snow" ? <WinterOutfit /> : ""}
        {props.type === "Rain" ? <RainOutfit temp={props.temp} /> : ""}
        {props.temp <= 50 && props.type !== "Rain" ? <WinterOutfit /> : ""}
        {props.temp > 50 && props.temp <= 79 && props.type !== "Rain" ? <WarmOutfit /> : ""}
        {props.temp >= 80 && props.type !== "Rain" ? <SummerOutfit /> : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>X</Button>
      </Modal.Footer>
    </Modal>
  );
}

const SuggestBtn = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const classes = useStyles();
    return (
      <div className={classes.root} id="suggest-btn">
        <Fab color="primary" aria-label="add">
          <i onClick={() => setModalShow(true)} className="fas fa-tshirt"></i>
        </Fab>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} temp={props.temp} type={props.type} />
      </div>
    );
}

export default SuggestBtn;
