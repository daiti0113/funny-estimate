import type { NextPage } from 'next'
import { Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { getCars, getPrice, makers } from '../db'
import { css } from "@emotion/react"

const Home: NextPage = () => {
  const [maker, setMaker] = useState("")
  const [car, setCar] = useState<{name: string|null, frontSet: number|null, rearSet: number|null} | undefined>({name: null, frontSet: null, rearSet: null})
  const [showResult, setShowResult] = useState(false)
  const cars = useMemo(() => getCars(maker), [maker])
  const test = useTheme()
  console.log(test)

  return (
    <div css={styles.container}>
      <Typography variant="h2" component="h1" gutterBottom color="#f7c923" css={css({textShadow: "2px 2px 4px #000", width: "100%", textAlign: "center"})}>
        カーフィルム施工見積もり
      </Typography>
      <FormControl css={styles.formContainer}>
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
        <Divider css={css({margin: 30})}/>
        {showResult && (
          <div css={styles.resultContainer}>
            <Typography variant="h4" component="h2" gutterBottom>お見積り内容</Typography>
            {<Typography variant="h5" component="p" gutterBottom>{car?.name}</Typography>}
            {car && <PriceTable car={car} />}
            <div css={css({marginTop: 30})}>
              <Typography variant="body1" component="p" gutterBottom>※古いフィルムの剥がし作業がある場合は、別途料金がかかります。</Typography>
              <Typography variant="body1" component="p" gutterBottom>※料金は年式やグレード等により若干前後する場合がございます。</Typography>
              <Typography variant="body1" component="p" gutterBottom>詳細については、お電話にてお問い合わせください。</Typography>
            </div>
          </div>
        )}
    </div>
  )
}

export default Home


const styles = {
  container: css({
    marginTop: 20,
  }),
  formContainer: css({
    display: "flex",
    rowGap: "30px",
    maxWidth: "400px",
    padding: "0 40px",
    margin: "40px auto 0 auto"
  }),
  resultContainer: css({
    rowGap: "30px",
    maxWidth: "600px",
    padding: "0 40px",
    margin: "40px auto 0 auto"
  })
}


const PriceTable = ({car}: {car: {name: string|null, frontSet: number|null, rearSet: number|null}}) => {
  return (
    <TableContainer>
      <Table sx={{maxWidth: 400}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>内容</TableCell>
            <TableCell align="right">料金</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key="frontSet">
              <TableCell component="th" scope="row">
                フロント3面
              </TableCell>
              <TableCell align="right">{car.frontSet}</TableCell>
            </TableRow>
            <TableRow key="frontSet">
              <TableCell component="th" scope="row">
                リア3面
              </TableCell>
              <TableCell align="right">{car.rearSet}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}