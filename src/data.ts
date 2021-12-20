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
  {value: 'Pacific/Pago_Pago', label: '🇦🇸 Pago Pago, American Samoa', utc: '-11:00'},
  {value: 'Pacific/Honolulu', label: '🇺🇸 Honolulu, United States', utc: '-10:00'},
  {value: 'Pacific/Guam', label: '🇬🇺 Guam', utc: '+10:00'},
  {value: 'Pacific/Port_Moresby', label: '🇵🇬 Port Moresby, Papua New Guinea', utc: '+10:00'},
  {value: 'Pacific/Guadalcanal', label: '🇸🇧 Guadalcanal, Solomon Islands', utc: '+11:00'},
  {value: 'Pacific/Noumea', label: '🇳🇨 Noumea, New Caledonia', utc: '+11:00'},
  {value: 'Pacific/Majuro', label: '🇲🇭 Majuro, Marshall Islands', utc: '+12:00'},
  {value: 'Pacific/Auckland', label: '🇳🇿 Auckland, New Zealand', utc: '+13:00'},
  {value: 'Pacific/Fakaofo', label: 'Fakaofo', utc: '+13:00'},
  {value: 'Pacific/Fiji', label: '🇫🇯 Fiji', utc: '+13:00'},
  {value: 'Pacific/Tongatapu', label: '🇹🇴 Tongatapu, Tonga', utc: '+13:00'},
  {value: 'Pacific/Apia', label: '🇼🇸 Apia, Samoa', utc: '+14:00'},
]

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Los_Angeles', label: '🇺🇸 U.S. Pacific Time', utc: '-08:00'},
  {value: 'America/Denver', label: '🇺🇸 U.S. Mountain Time', utc: '-07:00'},
  {value: 'America/Phoenix', label: '🇺🇸 U.S. Mountain Time - Arizona', utc: '-07:00'},
  {value: 'America/Chicago', label: '🇺🇸 U.S. Central Time', utc: '-06:00'},
  {value: 'America/New_York', label: '🇺🇸 U.S. Eastern', utc: '-05:00'},
  {value: 'America/Tijuana', label: '🇲🇽 Pacific Time - Tijuana', utc: '-08:00'},
  {value: 'America/Mazatlan', label: '🇲🇽 Mountain Time - Chihuahua, Mazatlan', utc: '-07:00'},
  {value: 'America/Mexico_City', label: '🇲🇽 Central Time - Mexico City', utc: '-06:00'},
  {value: 'America/Regina', label: '🇨🇦 Central Time - Regina', utc: '-06:00'},
  {value: 'Canada/Pacific', label: '🇨🇦 Canada Pacific', utc: '-07:00'},
  {value: 'Canada/Mountain', label: '🇨🇦 Canada Mountain', utc: '-06:00'},
  {value: 'Canada/Central', label: '🇨🇦 Canada Central', utc: '-05:00'},
  {value: 'America/Halifax', label: '🇨🇦 Atlantic Time - Halifax', utc: '-04:00'},
  {value: 'Canada/Atlantic', label: '🇨🇦 Canada Atlantic', utc: '-03:00'},
  {value: 'Canada/Newfoundland', label: '🇨🇦 Canada Newfoundland', utc: '-02:30'},
  {value: 'America/Godthab', label: '🇬🇱 West Greenland Standard Time', utc: '-03:00'},
]

export const CentralAmerica: readonly TimezoneOption[] = [
  {value: 'America/Guatemala', label: '🇬🇹 Guatemala', utc: '-06:00'},
  {value: 'America/Panama', label: '🇵🇦 Panama', utc: '-05:00'},
]

export const SouthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Bogota', label: '🇨🇴 Bogotá, Colombia', utc: '-06:00'},
  {value: 'America/Lima', label: '🇵🇪 Lima, Peru', utc: '-05:00'},
  {value: 'America/Caracas', label: '🇻🇪 Caracas, Venezuela', utc: '-04:30'},
  {value: 'America/Guyana', label: '🇬🇾 Guyana', utc: '-04:00'},
  {value: 'America/La_Paz', label: '🇧🇴 La Paz, Bolivia', utc: '-04:00'},
  {value: 'America/Argentina/Buenos_Aires', label: '🇦🇷 Buenos Aires, Argentina', utc: '-03:00'},
  {value: 'America/Montevideo', label: '🇺🇾 Montevideo, Uruguay', utc: '-03:00'},
  {value: 'America/Santiago', label: '🇨🇱 Santiago', utc: '-03:00'},
  {value: 'America/Sao_Paulo', label: '🇧🇷 São Paulo', utc: '-02:00'}
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'Europe/Dublin', label: '🇮🇪 Dublin, Ireland', utc: '+00:00'},
  {value: 'Europe/Lisbon', label: '🇵🇹 Lisbon, Portugal', utc: '+00:00'},
  {value: 'Europe/London', label: '🇬🇧 London, England', utc: '+00:00'},
  {value: 'Europe/Amsterdam', label: '🇳🇱 Amsterdam, Netherlands', utc: '+01:00'},
  {value: 'Europe/Berlin', label: '🇩🇪 Berlin, Germany', utc: '+01:00'},
  {value: 'Europe/Brussels', label: '🇧🇪 Brussels, Belgium', utc: '+01:00'},
  {value: 'Europe/Budapest', label: '🇭🇺 Budapest, Hungary', utc: '+01:00'},
  {value: 'Europe/Belgrade', label: '🇷🇸 Central European Time - Belgrade', utc: '+01:00'},
  {value: 'Europe/Prague', label: '🇨🇿 Central European Time - Prague', utc: '+01:00'},
  {value: 'Europe/Copenhagen', label: '🇩🇰 Copenhagen, Denmark', utc: '+01:00'},
  {value: 'Europe/Madrid', label: '🇪🇺 Central European', utc: '+01:00'},
  {value: 'Europe/Paris', label: '🇫🇷 Paris, France', utc: '+01:00'},
  {value: 'Europe/Rome', label: '🇮🇹 Rome, Italy', utc: '+01:00'},
  {value: 'Europe/Stockholm', label: '🇸🇪 Stockholm, Sweden', utc: '+01:00'},
  {value: 'Europe/Vienna', label: '🇦🇹 Vienna, Austria', utc: '+01:00'},
  {value: 'Europe/Warsaw', label: '🇵🇱 Warsaw, Poland', utc: '+01:00'},
  {value: 'Europe/Athens', label: '🇬🇷 Athens, Greece', utc: '+02:00'},
  {value: 'Europe/Bucharest', label: '🇷🇴 Bucharest, Romania', utc: '+02:00'},
  {value: 'Europe/Romania', label: '🇪🇺 Eastern European', utc: '+02:00'},
  {value: 'Europe/Moscow', label: '🇪🇺 Further Eastern European', utc: '+03:00'},
  {value: 'Europe/Helsinki', label: '🇫🇮 Helsinki, Finland', utc: '+02:00'},
  {value: 'Europe/Kiev', label: '🇺🇦 Kiev', utc: '+02:00'},
  {value: 'Europe/Kaliningrad', label: '🇷🇺 Moscow-01 - Kaliningrad', utc: '+02:00'},
  {value: 'Europe/Riga', label: '🇱🇻 Riga, Latvia', utc: '+02:00'},
  {value: 'Europe/Sofia', label: '🇧🇬 Sofia, Bulgaria', utc: '+02:00'},
  {value: 'Europe/Tallinn', label: '🇪🇪 Tallinn, Estonia', utc: '+02:00'},
  {value: 'Europe/Vilnius', label: '🇱🇹 Vilnius, Lithuania', utc: '+02:00'},
  {value: 'Europe/Istanbul', label: '🇹🇷 Istanbul, not Constantinople', utc: '+03:00'},
  {value: 'Europe/Minsk', label: '🇧🇾 Minsk, Belarus', utc: '+03:00'},
  {value: 'Europe/Moscow', label: '🇷🇺 Moscow+00 - Moscow', utc: '+03:00'},
  {value: 'Europe/Samara', label: '🇷🇺 Moscow+01 - Samara', utc: '+04:00'},
]

export const Australia: readonly TimezoneOption[] = [
  {value: 'Australia/Perth', label: '🇦🇺 Australian Western', utc: '+08:00'},
  {value: 'Australia/North', label: '🇦🇺 Australian Central Standard', utc: '+09:30'},
  {value: 'Australia/Canberra', label: '🇦🇺 Australian Eastern Standard', utc: '+10:00'},
  {value: 'Australia/Adelaide', label: '🇦🇺 Adelaide, Australia', utc: '+10:30'},
  {value: 'Australia/Hobart', label: '🇦🇺 Hobart, Australia', utc: '+11:00'},
  {value: 'Australia/Sydney', label: '🇦🇺 Eastern Time - Melbourne, Sydney, Australia', utc: '+11:00'},
  {value: 'Australia/LHI', label: '🇦🇺 Lord Howe Standard', utc: '+10:30'},
]

export const Atlantic: readonly TimezoneOption[] = [
  {value: 'Atlantic/South_Georgia', label: '🇬🇸 South Georgia', utc: '-02:00'},
  {value: 'Atlantic/Azores', label: '🇵🇹 Azores, Portugal', utc: '-01:00'},
  {value: 'Atlantic/Cape_Verde', label: '🇨🇻 Cape Verde', utc: '-01:00'},
]

export const Africa: readonly TimezoneOption[] = [
  {value: 'Africa/Casablanca', label: '🇲🇦 Casablanca, Morocco', utc: '+00:00'},
  {value: 'Africa/Monrovia', label: '🇱🇷 Monrovia, Liberia', utc: '+00:00'},
  {value: 'Africa/Algiers', label: '🇩🇿 Algiers, Algeria', utc: '+01:00'},
  {value: 'Africa/Cairo', label: '🇪🇬 Cairo, Egypt', utc: '+02:00'},
  {value: 'Africa/Johannesburg', label: '🇿🇦 Johannesburg, South Africa', utc: '+02:00'},
  {value: 'Africa/Nairobi', label: '🇰🇪 Nairobi, Kenya', utc: '+03:00'},
]

export const Asia: readonly TimezoneOption[] = [
  {value: 'Asia/Jerusalem', label: '🇮🇱 Jerusalem, Israel', utc: '+02:00'},
  {value: 'Asia/Baghdad', label: '🇮🇶 Bagdhad, Iraq', utc: '+03:00'},
  {value: 'Asia/Riyadh', label: '🇸🇦 Riyadh, Saudi Arabia', utc: '+03:00'},
  {value: 'Asia/Tehran', label: '🇮🇷 Tehran, Iran', utc: '+03:00'},
  {value: 'Asia/Baku', label: '🇦🇿 Baku, Azerbaijan', utc: '+04:00'},
  {value: 'Asia/Tbilisi', label: '🇬🇪 Tbilisi, Georgia', utc: '+04:00'},
  {value: 'Asia/Yerevan', label: '🇦🇲 Yerevan, Armenia', utc: '+04:00'},
  {value: 'Asia/Kabul', label: '🇦🇫 Kabul, Afghanistan', utc: '+04:30'},
  {value: 'Asia/Karachi', label: '🇵🇰 Karachi, Pakistan', utc: '+04:30'},
  {value: 'Asia/Yekaterinburg', label: '🇷🇺 Moscow+02 - Yekaterinburg', utc: '+05:00'},
  {value: 'Asia/Tashkent', label: '🇺🇿 Tashkent, Uzbekistan', utc: '+05:00'},
  {value: 'Asia/Colombo', label: '🇱🇰 Colombo, Sri Lanka', utc: '+05:30'},
  {value: 'Asia/Almaty', label: '🇰🇿 Almaty, Kazakhstan', utc: '+06:00'},
  {value: 'Asia/Dhaka', label: '🇧🇩 Dhaka, Bangladesh', utc: '+06:00'},
  {value: 'Asia/Rangoon', label: '🇲🇲 Rangoon, Myanmar', utc: '+06:30'},
  {value: 'Asia/Bangkok', label: '🇹🇭 Bangkok, Thailand', utc: '+07:00'},
  {value: 'Asia/Jakarta', label: '🇮🇩 Jakarta, Indonesia', utc: '+07:00'},
  {value: 'Asia/Krasnoyarsk', label: '🇷🇺 Moscow+04 Krasnoyarsk', utc: '+07:00'},
  {value: 'Asia/Shanghai', label: '🇨🇳 China Time - Beijing', utc: '+08:00'},
  {value: 'Asia/Hong_Kong', label: '🇭🇰 Hong Kong', utc: '+08:00'},
  {value: 'Asia/Kuala_Lumpur', label: '🇲🇾 Kuala Lumpur, Malaysia', utc: '+08:00'},
  {value: 'Asia/Singapore', label: '🇸🇬 Singapore', utc: '+08:00'},
  {value: 'Asia/Taipei', label: '🇹🇼 Taipei', utc: '+08:00'},
  {value: 'Asia/Ulaanbaatar', label: '🇲🇳 Ulaanbaatar', utc: '+08:00'},
  {value: 'Asia/Yakutsk', label: '🇷🇺 Moscow+06 Yakutsk', utc: '+09:00'},
  {value: 'Asia/Seoul', label: '🇰🇷 Seoul', utc: '+09:00'},
  {value: 'Asia/Tokyo', label: '🇯🇵 Tokyo, Japan', utc: '+09:00'},
  {value: 'Asia/Magadan', label: '🇷🇺 Moscow+07 - Magadan', utc: '+10:00'},
  {value: 'Asia/Vladivostok', label: '🇷🇺 Moscow+07 - Yuzhno-Sakhalinsk', utc: '+10:00'},
  {value: 'Asia/Kamchatka', label: '🇷🇺 Moscow+09 - Petropavlovsk-Kamchatskiy', utc: '+12:00'},
]

export const usTimeZones = [NorthAmerica[0],NorthAmerica[1],NorthAmerica[3],NorthAmerica[4]];
export const defaultTimeZones = [NorthAmerica[0], NorthAmerica[4], Europe[1], Australia[2]];
export interface GroupedOption {
  readonly label: string;
  readonly options: readonly TimezoneOption[] | readonly TimezoneOption[];
}

export const allTimezones: readonly TimezoneOption[] = [...NorthAmerica, ...CentralAmerica, ...SouthAmerica, ...Europe, ...Australia, ...Pacific, ...Atlantic, ...Africa];
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