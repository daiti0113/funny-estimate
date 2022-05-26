import type { NextPage } from 'next'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const makers = [
  { label: "トヨタ", value: "toyota" },
  { label: "日産", value: "nissan" },
  { label: "ホンダ", value: "honda" },
  { label: "マツダ", value: "mazda" },
  { label: "三菱", value: "mitsubishi" },
  { label: "スバル", value: "subaru" },
  { label: "ダイハツ", value: "daihatsu" },
  { label: "スズキ", value: "suzuki" },
]

const Home: NextPage = () => {
  const [maker, setMaker] = useState("")
  return (
    <FormControl>
      <Typography variant="h2" component="h1" gutterBottom>
        カーフィルム施工見積もり
      </Typography>
      <FormLabel id="demo-row-radio-buttons-group-label">フィルムの剥がし</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="peelOff" control={<Radio />} label="あり" />
        <FormControlLabel value="notPeelOff" control={<Radio />} label="なし" />
      </RadioGroup>
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
      <FormLabel id="demo-row-radio-buttons-group-label">車種</FormLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={maker}
        label="maker"
        onChange={(event) => setMaker(event.target.value)}
      >
        {makers.map(({ label, value }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
      </Select>
      <Button variant="contained">検索</Button>
    </FormControl>
  )
}

export default Home
