# Node.js console habit tracker

> Database: `database.json`
> Architecture: Controller -> Service -> Model

## Project structure

```
1-habit-tracker/
├─ package.json              # "type": "module"
├─ index.mjs                 # terminal entrypoint
├─ controllers/
│   └─ habit.controller.js   # cli layer
├─ services/
│   └─ habit.service.js      # business logic
├─ models/
│   └─ habit.model.js        # work with file & db
└─ database.json             # database \[]
````

## How to Use

### Install
```
1) npm install
2) specify `DAY_OFFSET` variable in root/env.sh // sets offsets in days when creating habit
3) run ". ./env.sh" in the terminal to set the environment variable which is specified on step 2
```

### Tracker Commands

1. `node index.mjs add --name "habit name" --freq daily|weekly|monthly // adds habit`

2. `node index.mjs list // show habit list`

3. `node index.mjs done --id habitId // add habit execution`

4. `node index.mjs stats // show habits stats`

5. `node index.mjs delete --id habitId // delete habit`

6. `node index.mjs update --id habitId --name "newName" --freq daily | weekly | monthly` 