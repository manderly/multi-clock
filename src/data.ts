export interface TimezoneOption {
  readonly value: string;
  readonly label: string;
}

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Los_Angeles', label: '🇺🇸 US Pacific (UTC-8:00)'},
  {value: 'America/Boise', label: '🇺🇸 US Mountain (UTC-7:00)'},
  {value: 'America/Chicago', label: '🇺🇸 US Central (UTC-6:00)'},
  {value: 'America/New_York', label: '🇺🇸 US Eastern (UTC-5:00)'},
  {value: 'Canada/Pacific', label: '🇨🇦 Canada Pacific (UTC-7:00)'},
  {value: 'Canada/Mountain', label: '🇨🇦 Canada Mountain (UTC-6:00'},
  {value: 'Canada/Central', label: '🇨🇦 Canada Central (UTC-5:00'},
  {value: 'Canada/Atlantic', label: '🇨🇦 Canada Atlantic (UTC-3:00'},
  {value: 'Canada/Newfoundland', label: '🇨🇦 Canada Newfoundland (UTC-2:30'},
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'Europe/London', label: 'Western European (UTC+0:00)'},
  {value: 'Europe/Madrid', label: 'Central European (UTC+1:00)'},
  {value: 'Europe/Romania', label: 'Eastern European (UTC+2:00)'},
  {value: 'Europe/Moscow', label: 'Further Eastern European (UTC+3:00)'}
]

export const Australia: readonly TimezoneOption[] = [
  {value: 'Australia/Perth', label: '🇦🇺 Australian Western (UTC+8:00)'},
  {value: 'Australia/North', label: '🇦🇺 Australian Central Standard (UTC+9:30)'},
  {value: 'Australia/Canberra', label: '🇦🇺 Australian Eastern Standard (UTC+10:00)'},
  {value: 'Australia/LHI', label: '🇦🇺 Lord Howe Standard (UTC+10:30)'},
]

export const usTimeZones = [NorthAmerica[0],NorthAmerica[1],NorthAmerica[2],NorthAmerica[3]];
export const defaultTimeZones = [NorthAmerica[0], NorthAmerica[1], Europe[1], Australia[2]];
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
  {
    label: 'Australia',
    options: Australia,
  },
];