import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from '@mui/material';

import { useExercises } from '../contexts/ExercisesProvider';

const filter = createFilterOptions();

const ExerciseCreateOptionDialog = ({ exerciseValue, setExerciseValue }) => {
  const [value, setValue] = React.useState(
    exerciseValue
      ? {
          id: exerciseValue.id,
          title: exerciseValue.title,
          type: exerciseValue.type,
        }
      : null
  );
  const [open, toggleOpen] = React.useState(false);
  const { exercises } = useExercises();

  //test
  // console.log(exerciseValue);

  const handleClose = () => {
    setDialogValue({
      title: '',
      type: 'strength',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    type: 'strength',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    setValue({
      id: exerciseValue.id,
      title: dialogValue.title,
      type: dialogValue.type,
    });
    handleClose();
  };

  React.useEffect(() => {
    setExerciseValue(value);
  }, [value]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                type: 'strength',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              type: 'strength',
            });
          } else {
            setValue({ id: exerciseValue.id, ...newValue });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add exercise "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={exercises}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          if (option.title) {
            return option.title;
          }
          return '';
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) =>
          option.type ? (
            <li {...props}>
              <strong>{option.title}</strong> {`      /${option.type}`}
            </li>
          ) : (
            <li {...props}>{option.title}</li>
          )
        }
        freeSolo
        renderInput={(params) => <TextField {...params} label="Exercise" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new exercise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any exercise in our list? Please, add it!
            </DialogContentText>
            <br />
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.title}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    title: event.target.value,
                  })
                }
                label="title"
                type="text"
                variant="standard"
              />
              <br />
              <FormControl sx={{ p: 1 }}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  defaultValue={'strength'}
                  value={dialogValue.type}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      type: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel
                    value="Weights"
                    control={<Radio />}
                    label="Weights"
                  />
                  <FormControlLabel
                    value="Cardio"
                    control={<Radio />}
                    label="Cardio"
                  />
                  <FormControlLabel
                    value="Body weight"
                    control={<Radio />}
                    label="Body weight"
                  />
                  <FormControlLabel
                    value="Stretch"
                    control={<Radio />}
                    label="Stretch"
                  />
                  <FormControlLabel
                    value="Yoga"
                    control={<Radio />}
                    label="Yoga"
                  />
                </RadioGroup>
              </FormControl>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ExerciseCreateOptionDialog;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const top100Films = [
  { title: 'The Shawshank Redemption', type: 'aerobic' },
  { title: 'The Godfather', type: 'aerobic' },
  { title: 'The Godfather: Part II', type: 'strength' },
  { title: 'The Dark Knight', type: 'strength' },
  { title: '12 Angry Men', type: 'strength' },
  { title: "Schindler's List", type: 'strength' },
  { title: 'Pulp Fiction', type: 'aerobic' },
  {
    title: 'The Lord of the Rings: The Return of the King',
    type: 'aerobic',
  },
  { title: 'The Good, the Bad and the Ugly', type: 'aerobic' },
  { title: 'Fight Club', type: 'aerobic' },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    type: 'aerobic',
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    type: 'aerobic',
  },
  { title: 'Forrest Gump', type: 'strength' },
  { title: 'Inception', type: 'strength' },
  {
    title: 'The Lord of the Rings: The Two Towers',
    type: 'aerobic',
  },
  { title: 'Goodfellas', type: 'aerobic' },
  { title: 'The Matrix', type: 'aerobic' },
  { title: 'Seven Samurai', type: 'aerobic' },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    type: 'aerobic',
  },

  { title: 'Sunset Boulevard', type: 'aerobic' },
  {
    title:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    type: 'aerobic',
  },
  { title: 'The Great Dictator', type: 'aerobic' },
  { title: 'Cinema Paradiso', type: 'aerobic' },
  { title: 'The Lives of Others', type: 'aerobic' },
  { title: 'Grave of the Fireflies', type: 'aerobic' },
  { title: 'Paths of Glory', type: 'aerobic' },
  { title: 'Django Unchained', type: 'aerobic' },
  { title: 'The Shining', type: 'aerobic' },
  { title: 'WALL·E', type: 'aerobic' },
  { title: 'American Beauty', type: 'aerobic' },
  { title: 'The Dark Knight Rises', type: 'aerobic' },
  { title: 'Princess Mononoke', type: 'aerobic' },
  { title: 'Aliens', type: 'aerobic' },
  { title: 'Oldboy', type: 'aerobic' },
  { title: 'Once Upon a Time in America', type: 'aerobic' },
  { title: 'Witness for the Prosecution', type: 'aerobic' },
  { title: 'Das Boot', type: 'aerobic' },
  { title: 'Citizen Kane', type: 'aerobic' },
  { title: 'North by Northwest', type: 'aerobic' },
  { title: 'Vertigo', type: 'aerobic' },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    type: 'aerobic',
  },
  { title: 'Reservoir Dogs', type: 'aerobic' },
  { title: 'Braveheart', type: 'aerobic' },
  { title: 'M', type: 'aerobic' },
  { title: 'Requiem for a Dream', type: 'aerobic' },
  { title: 'Amélie', type: 'aerobic' },
  { title: 'A Clockwork Orange', type: 'aerobic' },
  { title: 'Like Stars on Earth', type: 'aerobic' },
  { title: 'Taxi Driver', type: 'aerobic' },
  { title: 'Lawrence of Arabia', type: 'aerobic' },
  { title: 'Double Indemnity', type: 'aerobic' },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    type: 'aerobic',
  },
  { title: 'Amadeus', type: 'aerobic' },
  { title: 'To Kill a Mockingbird', type: 'aerobic' },
  { title: 'Toy Story 3', type: 'strength' },
];
