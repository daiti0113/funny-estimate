import type { NextPage } from 'next'
import { Button, Divider, FormControl, FormLabel, Link, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { getCars, getPrice, makers } from '../db'
import { css } from "@emotion/react"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../constants'
import Image from 'next/image'

const Home: NextPage = () => {
  const [maker, setMaker] = useState("")
  const [car, setCar] = useState<{name: string|null, frontSet: number|null, rearSet: number|null} | undefined>({name: null, frontSet: null, rearSet: null})
  const [showResult, setShowResult] = useState(false)
  const cars = useMemo(() => getCars(maker), [maker])

  return (
    <div css={css({display: "grid", gridTemplateRows: `${HEADER_HEIGHT} minmax(calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT}), auto) ${FOOTER_HEIGHT}`})}>
      <header css={css({height: HEADER_HEIGHT, display: "flex", alignItems: "center", padding: "0 30px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", position: "relative"})}>
        <div style={{ position: 'relative', width: 120, height: 60 }}>
            <Image src="/logo.png" alt='logo' layout="fill" objectFit='contain' />
        </div>
        <div css={css({marginLeft: "auto", display: "flex", gap: 20})}>
          <Link href="https://funny-okinawa.com" underline="hover" color="#212121">ホームページ</Link>
          <Link href="https://www.instagram.com/funny.okinawa" underline="hover" color="#212121">Instagram</Link>
        </div>
      </header>
      <div css={css({background: "#fff7db", padding: "40px 0", display: "grid", justifyContent: "center"})}>
      <FormControl css={styles.formContainer}>
        <Typography variant="h2" component="h2" gutterBottom sx={{fontSize: {xs: 22, sm: 36}}}>車種情報を入力してください</Typography>
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
        <Button variant="contained" onClick={() => setShowResult(true)} disabled={!car}>料金を調べる</Button>
        </FormControl>
        {showResult && (
          <>
            <Divider css={css({margin: "40px 0"})}/>
            <div css={styles.resultContainer}>
              <Typography variant="h2" component="h2" gutterBottom sx={{fontSize: {xs: 22, sm: 36}}}>お見積り内容</Typography>
              <Typography variant="h3" component="p" gutterBottom css={css({marginTop: 30, wordBreak: "keep-all"})}>車種 : {car?.name}</Typography>
              {car && <PriceTable car={car} />}
              <div css={css({marginTop: 30})}>
                <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※古いフィルムの剥がし作業がある場合は、別途料金がかかります。</Typography>
                <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>※料金は年式やグレード等により若干前後する場合がございます。</Typography>
                <Typography variant="body1" component="p" gutterBottom sx={{fontSize: {xs: 14, sm: 16}}}>詳細については、お電話にてお問い合わせください。</Typography>
              </div>
            </div>
          </>
        )}
        </div>
        <footer css={css({height: FOOTER_HEIGHT, background: "#ccc", padding: 20})}>
          <div style={{ position: 'relative', width: 120, height: 60 }}>
            <Image src="/logo.png" alt='logo' layout="fill" objectFit='contain' />
          </div>
          <Typography variant="body2" component="p" gutterBottom>沖縄県浦添市沢岻1-42-1 玉城住宅1F</Typography>
          <Link href="tel:09019453965" color="#212121" variant="body2" gutterBottom>☎090-1945-3965</Link>
        </footer>
    </div>
  )
}

export default Home


const styles = {
  formContainer: css({
    display: "flex",
    rowGap: "30px",
    maxWidth: "600px",
    padding: "0 40px",
  }),
  resultContainer: css({
    rowGap: "30px",
    maxWidth: "600px",
    padding: "0 40px",
  })
}


const PriceTable = ({car}: {car: {name: string|null, frontSet: number|null, rearSet: number|null}}) => {
  return (
    <TableContainer>
      <Table sx={{maxWidth: 400, margin: "20px auto"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">料金</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key="frontSet">
              <TableCell component="th" scope="row" variant="body">
                <Typography variant="body1" gutterBottom>フロント3面</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h4" gutterBottom>{car.frontSet?.toLocaleString()}円</Typography>
              </TableCell>
            </TableRow>
            <TableRow key="frontSet">
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>リア3面</Typography>
              </TableCell>
              <TableCell align="right">
              <Typography variant="h4" gutterBottom>{car.rearSet?.toLocaleString()}円</Typography>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}