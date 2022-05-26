import type { NextPage } from 'next'
import { Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { getCars, getPrice, makers } from '../db'

const Home: NextPage = () => {
  const [peelOff, setPeelOff] = useState("0")
  const [maker, setMaker] = useState("")
  const [car, setCar] = useState<{name: string|null, frontSet: number|null, rearSet: number|null} | undefined>({name: null, frontSet: null, rearSet: null})
  const [showResult, setShowResult] = useState(false)
  const cars = useMemo(() => getCars(maker), [maker])

  return (
    <div>
      <FormControl>
        <Typography variant="h2" component="h1" gutterBottom>
          カーフィルム施工見積もり
        </Typography>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">フィルムの剥がし</FormLabel>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={peelOff} onChange={event => setPeelOff(event.target.value)}>
            <FormControlLabel value="0" control={<Radio />} label="あり" />
            <FormControlLabel value="1" control={<Radio />} label="なし" />
          </RadioGroup>
          <FormHelperText>古いフィルムの剥がし作業がある場合は、別途料金がかかります</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">メーカー</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={maker}
            label="メーカー"
            onChange={(event) => setMaker(event.target.value)}
          >
            {makers.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">車種</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={car?.name}
            label="maker"
            onChange={(event) => {
              const car = getPrice(maker, event.target.value)
              setCar(car)
            }}
            disabled={!cars}
          >
            {cars && cars.map(({ name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setShowResult(true)} disabled={!car}>お見積り</Button>
        </FormControl>
        <Divider />
        {showResult && (
          <div>
            <Typography variant="h3" component="h2" gutterBottom>お見積り内容</Typography>
            {<Typography variant="body1" component="p" gutterBottom>フロント3面: {car?.frontSet}</Typography>}
            {<Typography variant="body1" component="p" gutterBottom>リア3面: {car?.rearSet}</Typography>}
            {peelOff && <Typography variant="body1" component="p" gutterBottom>お手数をおかけしますが、剥がし料金はお問い合わせください</Typography>}
          </div>
        )}
    </div>
  )
}

export default Home
