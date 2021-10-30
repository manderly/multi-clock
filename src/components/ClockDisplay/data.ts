export interface TimezoneOption {
  readonly value: string;
  readonly label: string;
}

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Chicago', label: 'US Eastern (UTC-5)'},
  {value: 'America/NewYork', label: 'US Central (UTC-6)'},
  {value: 'America/Montana', label: 'US Mountain (UTC-7)'},
  {value: 'America/LosAngeles', label: 'US Pacific (UTC-8)'}
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'London', label: 'British (UTC+1)'},
  {value: 'Madrid', label: 'Central European (UTC+2)'},
  {value: 'Eastern', label: 'Eastern European (UTC+3)'}
]

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly TimezoneOption[] | readonly TimezoneOption[];
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: 'North America',
    options: NorthAmerica,
  },
  {
    label: 'Europe',
    options: Europe,
  },
];