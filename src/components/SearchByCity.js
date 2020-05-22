import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SearchByCity = (props) => {
    const classes = useStyles();
    return (
      <>
        <form onSubmit={props.handleSubmit} className={classes.root}>
          <TextField id="standard-basic" name="city" onChange={props.handleChange} label="City"  />
          <Button type="submit" variant="outlined" color="primary">Search</Button>
        </form>
      </>
    );
}

export default SearchByCity;
