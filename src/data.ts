export interface TimezoneOption {
  readonly value: string;
  readonly label: string;
  readonly utc: string;
}

/* 
{
  "(GMT-11:00) Pago Pago": "Pacific/Pago_Pago",
  "(GMT-10:00) Hawaii Time": "Pacific/Honolulu",
  "(GMT-08:00) Pacific Time": "America/Los_Angeles",
  "(GMT-08:00) Pacific Time - Tijuana": "America/Tijuana",
  "(GMT-07:00) Mountain Time": "America/Denver",
  "(GMT-07:00) Mountain Time - Arizona": "America/Phoenix",
  "(GMT-07:00) Mountain Time - Chihuahua, Mazatlan": "America/Mazatlan",
  "(GMT-06:00) Central Time": "America/Chicago",
  "(GMT-06:00) Central Time - Mexico City": "America/Mexico_City",
  "(GMT-06:00) Central Time - Regina": "America/Regina",
  "(GMT-06:00) Guatemala": "America/Guatemala",
  "(GMT-05:00) Bogota": "America/Bogota",
  "(GMT-05:00) Eastern Time": "America/New_York",
  "(GMT-05:00) Lima": "America/Lima",
  "(GMT-04:30) Caracas": "America/Caracas",
  "(GMT-04:00) Atlantic Time - Halifax": "America/Halifax",
  "(GMT-04:00) Guyana": "America/Guyana",
  "(GMT-04:00) La Paz": "America/La_Paz",
  "(GMT-03:00) Buenos Aires": "America/Argentina/Buenos_Aires",
  "(GMT-03:00) Godthab": "America/Godthab",
  "(GMT-03:00) Montevideo": "America/Montevideo",
  "(GMT-03:30) Newfoundland Time - St. Johns": "America/St_Johns",
  "(GMT-03:00) Santiago": "America/Santiago",
  "(GMT-02:00) Sao Paulo": "America/Sao_Paulo",
  "(GMT-02:00) South Georgia": "Atlantic/South_Georgia",
  "(GMT-01:00) Azores": "Atlantic/Azores",
  "(GMT-01:00) Cape Verde": "Atlantic/Cape_Verde",
  "(GMT+00:00) Casablanca": "Africa/Casablanca",
  "(GMT+00:00) Dublin": "Europe/Dublin",
  "(GMT+00:00) Lisbon": "Europe/Lisbon",
  "(GMT+00:00) London": "Europe/London",
  "(GMT+00:00) Monrovia": "Africa/Monrovia",
  "(GMT+01:00) Algiers": "Africa/Algiers",
  "(GMT+01:00) Amsterdam": "Europe/Amsterdam",
  "(GMT+01:00) Berlin": "Europe/Berlin",
  "(GMT+01:00) Brussels": "Europe/Brussels",
  "(GMT+01:00) Budapest": "Europe/Budapest",
  "(GMT+01:00) Central European Time - Belgrade": "Europe/Belgrade",
  "(GMT+01:00) Central European Time - Prague": "Europe/Prague",
  "(GMT+01:00) Copenhagen": "Europe/Copenhagen",
  "(GMT+01:00) Madrid": "Europe/Madrid",
  "(GMT+01:00) Paris": "Europe/Paris",
  "(GMT+01:00) Rome": "Europe/Rome",
  "(GMT+01:00) Stockholm": "Europe/Stockholm",
  "(GMT+01:00) Vienna": "Europe/Vienna",
  "(GMT+01:00) Warsaw": "Europe/Warsaw",
  "(GMT+02:00) Athens": "Europe/Athens",
  "(GMT+02:00) Bucharest": "Europe/Bucharest",
  "(GMT+02:00) Cairo": "Africa/Cairo",
  "(GMT+02:00) Jerusalem": "Asia/Jerusalem",
  "(GMT+02:00) Johannesburg": "Africa/Johannesburg",
  "(GMT+02:00) Helsinki": "Europe/Helsinki",
  "(GMT+02:00) Kiev": "Europe/Kiev",
  "(GMT+02:00) Moscow-01 - Kaliningrad": "Europe/Kaliningrad",
  "(GMT+02:00) Riga": "Europe/Riga",
  "(GMT+02:00) Sofia": "Europe/Sofia",
  "(GMT+02:00) Tallinn": "Europe/Tallinn",
  "(GMT+02:00) Vilnius": "Europe/Vilnius",
  "(GMT+03:00) Istanbul": "Europe/Istanbul",
  "(GMT+03:00) Baghdad": "Asia/Baghdad",
  "(GMT+03:00) Nairobi": "Africa/Nairobi",
  "(GMT+03:00) Minsk": "Europe/Minsk",
  "(GMT+03:00) Riyadh": "Asia/Riyadh",
  "(GMT+03:00) Moscow+00 - Moscow": "Europe/Moscow",
  "(GMT+03:30) Tehran": "Asia/Tehran",
  "(GMT+04:00) Baku": "Asia/Baku",
  "(GMT+04:00) Moscow+01 - Samara": "Europe/Samara",
  "(GMT+04:00) Tbilisi": "Asia/Tbilisi",
  "(GMT+04:00) Yerevan": "Asia/Yerevan",
  "(GMT+04:30) Kabul": "Asia/Kabul",
  "(GMT+05:00) Karachi": "Asia/Karachi",
  "(GMT+05:00) Moscow+02 - Yekaterinburg": "Asia/Yekaterinburg",
  "(GMT+05:00) Tashkent": "Asia/Tashkent",
  "(GMT+05:30) Colombo": "Asia/Colombo",
  "(GMT+06:00) Almaty": "Asia/Almaty",
  "(GMT+06:00) Dhaka": "Asia/Dhaka",
  "(GMT+06:30) Rangoon": "Asia/Rangoon",
  "(GMT+07:00) Bangkok": "Asia/Bangkok",
  "(GMT+07:00) Jakarta": "Asia/Jakarta",
  "(GMT+07:00) Moscow+04 - Krasnoyarsk": "Asia/Krasnoyarsk",
  "(GMT+08:00) China Time - Beijing": "Asia/Shanghai",
  "(GMT+08:00) Hong Kong": "Asia/Hong_Kong",
  "(GMT+08:00) Kuala Lumpur": "Asia/Kuala_Lumpur",
  "(GMT+08:00) Moscow+05 - Irkutsk": "Asia/Irkutsk",
  "(GMT+08:00) Singapore": "Asia/Singapore",
  "(GMT+08:00) Taipei": "Asia/Taipei",
  "(GMT+08:00) Ulaanbaatar": "Asia/Ulaanbaatar",
  "(GMT+08:00) Western Time - Perth": "Australia/Perth",
  "(GMT+09:00) Moscow+06 - Yakutsk": "Asia/Yakutsk",
  "(GMT+09:00) Seoul": "Asia/Seoul",
  "(GMT+09:00) Tokyo": "Asia/Tokyo",
  "(GMT+09:30) Central Time - Darwin": "Australia/Darwin",
  "(GMT+10:00) Eastern Time - Brisbane": "Australia/Brisbane",
  "(GMT+10:00) Guam": "Pacific/Guam",
  "(GMT+10:00) Moscow+07 - Magadan": "Asia/Magadan",
  "(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk": "Asia/Vladivostok",
  "(GMT+10:00) Port Moresby": "Pacific/Port_Moresby",
  "(GMT+10:30) Central Time - Adelaide": "Australia/Adelaide",
  "(GMT+11:00) Eastern Time - Hobart": "Australia/Hobart",
  "(GMT+11:00) Eastern Time - Melbourne, Sydney": "Australia/Sydney",
  "(GMT+11:00) Guadalcanal": "Pacific/Guadalcanal",
  "(GMT+11:00) Noumea": "Pacific/Noumea",
  "(GMT+12:00) Majuro": "Pacific/Majuro",
  "(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy": "Asia/Kamchatka",
  "(GMT+13:00) Auckland": "Pacific/Auckland",
  "(GMT+13:00) Fakaofo": "Pacific/Fakaofo",
  "(GMT+13:00) Fiji": "Pacific/Fiji",
  "(GMT+13:00) Tongatapu": "Pacific/Tongatapu",
  "(GMT+14:00) Apia": "Pacific/Apia"
}

*/

export const Pacific: readonly TimezoneOption[] = [
  {value: 'Pacific/Pago_Pago', label: '🇦🇸 Pago Pago (American Samoa)', utc: '-11:00'},
  {value: 'Pacific/Honolulu', label: '🇺🇸 Honolulu (United States)', utc: '-10:00'},
]

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Los_Angeles', label: '🇺🇸 Pacific Time', utc: '-8:00'},
  {value: 'America/Denver', label: '🇺🇸 Mountain Time', utc: '-7:00'},
  {value: 'America/Phoenix', label: '🇺🇸 Mountain Time - Arizona', utc: '-7:00'},
  {value: 'America/Chicago', label: '🇺🇸 Central Time', utc: '-6:00'},
  {value: 'America/New_York', label: '🇺🇸 US Eastern (UTC-5:00)', utc: '-5:00'},
  {value: 'America/Tijuana', label: '🇲🇽 Pacific Time - Tijuana', utc: '-8:00'},
  {value: 'America/Mazatlan', label: '🇲🇽 Mountain Time - Chihuahua, Mazatlan', utc: '-7:00'},
  {value: 'America/Mexico_City', label: '🇲🇽 Central Time - Mexico City', utc: '-6:00'},
  {value: 'America/Regina', label: '🇨🇦 Central Time - Regina', utc: '-6:00'},
  {value: 'Canada/Pacific', label: '🇨🇦 Canada Pacific (UTC-7:00)', utc: '-7:00'},
  {value: 'Canada/Mountain', label: '🇨🇦 Canada Mountain (UTC-6:00', utc: '-6:00'},
  {value: 'Canada/Central', label: '🇨🇦 Canada Central (UTC-5:00', utc: '-5:00'},
  {value: 'Canada/Atlantic', label: '🇨🇦 Canada Atlantic (UTC-3:00', utc: '-3:00'},
  {value: 'Canada/Newfoundland', label: '🇨🇦 Canada Newfoundland (UTC-2:30', utc: '-2:30'},
]

export const CentralAmerica: readonly TimezoneOption[] = [
  {value: 'America/Guatemala', label: '🇬🇹 Guatemala', utc: '-6:00'},
  {value: 'America/Panama', label: '🇵🇦 Panama', utc: '-5:00'},
]

export const SouthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Bogota', label: '🇨🇴 Bogota', utc: '-6:00'},
  {value: 'America/Lima', label: '🇵🇪 Lima', utc: '-5:00'},
  {value: 'America/Caracas', label: '🇻🇪 Caracas', utc: '-4:30'},
  {value: 'America/Halifax', label: 'Atlantic Time - Halifax', utc: '-4:00'},
  {value: 'America/Guyana', label: 'Guyana', utc: '-4:00'},
  {value: 'America/La_Paz', label: 'La Paz', utc: '-4:00'},
  {value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires', utc: '-3:00'},
  {value: 'America/America/Godthab', label: 'Godthab', utc: '-3:00'},
  {value: 'America/Montevideo', label: 'Montevideo', utc: '-3:00'},
  {value: 'America/Santiago', label: 'Santiago', utc: '-3:00'},
  {value: 'America/Sao_Paulo', label: 'Sao_Paulo', utc: '-2:00'}
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'Europe/London', label: 'Western European', utc: '+0:00'},
  {value: 'Europe/Madrid', label: 'Central European', utc: '+1:00'},
  {value: 'Europe/Romania', label: 'Eastern European', utc: '+2:00'},
  {value: 'Europe/Moscow', label: 'Further Eastern European', utc: '+3:00'}
]

export const Australia: readonly TimezoneOption[] = [
  {value: 'Australia/Perth', label: '🇦🇺 Australian Western', utc: '+8:00'},
  {value: 'Australia/North', label: '🇦🇺 Australian Central Standard', utc: '+9:30'},
  {value: 'Australia/Canberra', label: '🇦🇺 Australian Eastern Standard', utc: '+10:00'},
  {value: 'Australia/LHI', label: '🇦🇺 Lord Howe Standard', utc: '+10:30'},
]

export const usTimeZones = [NorthAmerica[0],NorthAmerica[1],NorthAmerica[3],NorthAmerica[4]];
export const defaultTimeZones = [NorthAmerica[0], NorthAmerica[4], Europe[1], Australia[2]];
export interface GroupedOption {
  readonly label: string;
  readonly options: readonly TimezoneOption[] | readonly TimezoneOption[];
}

export const allTimezones: readonly TimezoneOption[] = [...NorthAmerica, ...CentralAmerica, ...SouthAmerica, ...Europe, ...Australia, ...Pacific];
export const groupedOptions: readonly GroupedOption[] = [
  {
    label: 'North America',
    options: NorthAmerica,
  },
  { label: 'Central America',
    options: CentralAmerica
  },
  {
    label: 'South America',
    options: SouthAmerica,
  },
  {
    label: 'Europe',
    options: Europe,
  },
  {
    label: 'Australia',
    options: Australia,
  },
  {
    label: 'Pacific',
    options: Pacific
  }
];