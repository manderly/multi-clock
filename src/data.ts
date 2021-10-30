export interface TimezoneOption {
  readonly value: string;
  readonly label: string;
}

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Chicago', label: 'US Eastern (UTC-5)'},
  {value: 'America/New_York', label: 'US Central (UTC-6)'},
  {value: 'America/Boise', label: 'US Mountain (UTC-7)'},
  {value: 'America/Los_Angeles', label: 'US Pacific (UTC-8)'}
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'Europe/London', label: 'British (UTC+1)'},
  {value: 'Europe/Madrid', label: 'Central European (UTC+2)'},
  {value: 'Europe/Moscow', label: 'Eastern European (UTC+3)'}
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