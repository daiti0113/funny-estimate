export type makers = Array<{
  label: string;
  value: string;
  cars: Array<{
    name: string;
    frontSet: number;
    rearSet: number;
  } | {
    name: string;
    frontSet: number;
    rearSet: null;
  }>
}> | null

export const getMakers = (makers: makers) => makers?.map(({label, value}) => ({label, value}))

export const getCars = (makers: makers, maker: string) => makers?.find(({value}) => value === maker)?.cars
export const getPrice = (makers: makers, maker: string, car: string | null) => {
  const cars = getCars(makers, maker)
  return cars && cars.find(({name}) => name === car)
}
