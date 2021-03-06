export interface TimezoneOption {
  readonly value: string;
  readonly label: string;
  readonly utc: string;
}

export const Pacific: readonly TimezoneOption[] = [
  {value: 'Pacific/Pago_Pago', label: 'π¦πΈ Pago Pago, American Samoa', utc: '-11:00'},
  {value: 'Pacific/Honolulu', label: 'πΊπΈ Honolulu, United States', utc: '-10:00'},
  {value: 'Pacific/Guam', label: 'π¬πΊ Guam', utc: '+10:00'},
  {value: 'Pacific/Port_Moresby', label: 'π΅π¬ Port Moresby, Papua New Guinea', utc: '+10:00'},
  {value: 'Pacific/Guadalcanal', label: 'πΈπ§ Guadalcanal, Solomon Islands', utc: '+11:00'},
  {value: 'Pacific/Noumea', label: 'π³π¨ Noumea, New Caledonia', utc: '+11:00'},
  {value: 'Pacific/Majuro', label: 'π²π­ Majuro, Marshall Islands', utc: '+12:00'},
  {value: 'Pacific/Auckland', label: 'π³πΏ Auckland, New Zealand', utc: '+13:00'},
  {value: 'Pacific/Fakaofo', label: 'Fakaofo', utc: '+13:00'},
  {value: 'Pacific/Fiji', label: 'π«π― Fiji', utc: '+13:00'},
  {value: 'Pacific/Tongatapu', label: 'πΉπ΄ Tongatapu, Tonga', utc: '+13:00'},
  {value: 'Pacific/Apia', label: 'πΌπΈ Apia, Samoa', utc: '+14:00'},
]

export const NorthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Los_Angeles', label: 'πΊπΈ U.S. Pacific Time', utc: '-08:00'},
  {value: 'America/Denver', label: 'πΊπΈ U.S. Mountain Time', utc: '-07:00'},
  {value: 'America/Phoenix', label: 'πΊπΈ U.S. Mountain Time - Arizona', utc: '-07:00'},
  {value: 'America/Chicago', label: 'πΊπΈ U.S. Central Time', utc: '-06:00'},
  {value: 'America/New_York', label: 'πΊπΈ U.S. Eastern', utc: '-05:00'},
  {value: 'America/Tijuana', label: 'π²π½ Pacific Time - Tijuana', utc: '-08:00'},
  {value: 'America/Mazatlan', label: 'π²π½ Mountain Time - Chihuahua, Mazatlan', utc: '-07:00'},
  {value: 'America/Mexico_City', label: 'π²π½ Central Time - Mexico City', utc: '-06:00'},
  {value: 'America/Regina', label: 'π¨π¦ Central Time - Regina', utc: '-06:00'},
  {value: 'Canada/Pacific', label: 'π¨π¦ Canada Pacific', utc: '-07:00'},
  {value: 'Canada/Mountain', label: 'π¨π¦ Canada Mountain', utc: '-06:00'},
  {value: 'Canada/Central', label: 'π¨π¦ Canada Central', utc: '-05:00'},
  {value: 'America/Halifax', label: 'π¨π¦ Atlantic Time - Halifax', utc: '-04:00'},
  {value: 'Canada/Atlantic', label: 'π¨π¦ Canada Atlantic', utc: '-03:00'},
  {value: 'Canada/Newfoundland', label: 'π¨π¦ Canada Newfoundland', utc: '-02:30'},
  {value: 'America/Godthab', label: 'π¬π± West Greenland Standard Time', utc: '-03:00'},
]

export const CentralAmerica: readonly TimezoneOption[] = [
  {value: 'America/Guatemala', label: 'π¬πΉ Guatemala', utc: '-06:00'},
  {value: 'America/Panama', label: 'π΅π¦ Panama', utc: '-05:00'},
]

export const SouthAmerica: readonly TimezoneOption[] = [
  {value: 'America/Bogota', label: 'π¨π΄ BogotΓ‘, Colombia', utc: '-06:00'},
  {value: 'America/Lima', label: 'π΅πͺ Lima, Peru', utc: '-05:00'},
  {value: 'America/Caracas', label: 'π»πͺ Caracas, Venezuela', utc: '-04:30'},
  {value: 'America/Guyana', label: 'π¬πΎ Guyana', utc: '-04:00'},
  {value: 'America/La_Paz', label: 'π§π΄ La Paz, Bolivia', utc: '-04:00'},
  {value: 'America/Argentina/Buenos_Aires', label: 'π¦π· Buenos Aires, Argentina', utc: '-03:00'},
  {value: 'America/Montevideo', label: 'πΊπΎ Montevideo, Uruguay', utc: '-03:00'},
  {value: 'America/Santiago', label: 'π¨π± Santiago', utc: '-03:00'},
  {value: 'America/Sao_Paulo', label: 'π§π· SΓ£o Paulo', utc: '-02:00'}
]

export const Europe: readonly TimezoneOption[] = [
  {value: 'Europe/Dublin', label: 'π?πͺ Dublin, Ireland', utc: '+00:00'},
  {value: 'Europe/Lisbon', label: 'π΅πΉ Lisbon, Portugal', utc: '+00:00'},
  {value: 'Europe/London', label: 'π¬π§ London, England', utc: '+00:00'},
  {value: 'Europe/Amsterdam', label: 'π³π± Amsterdam, Netherlands', utc: '+01:00'},
  {value: 'Europe/Berlin', label: 'π©πͺ Berlin, Germany', utc: '+01:00'},
  {value: 'Europe/Brussels', label: 'π§πͺ Brussels, Belgium', utc: '+01:00'},
  {value: 'Europe/Budapest', label: 'π­πΊ Budapest, Hungary', utc: '+01:00'},
  {value: 'Europe/Belgrade', label: 'π·πΈ Central European Time - Belgrade', utc: '+01:00'},
  {value: 'Europe/Prague', label: 'π¨πΏ Central European Time - Prague', utc: '+01:00'},
  {value: 'Europe/Copenhagen', label: 'π©π° Copenhagen, Denmark', utc: '+01:00'},
  {value: 'Europe/Madrid', label: 'πͺπΊ Central European', utc: '+01:00'},
  {value: 'Europe/Paris', label: 'π«π· Paris, France', utc: '+01:00'},
  {value: 'Europe/Rome', label: 'π?πΉ Rome, Italy', utc: '+01:00'},
  {value: 'Europe/Stockholm', label: 'πΈπͺ Stockholm, Sweden', utc: '+01:00'},
  {value: 'Europe/Vienna', label: 'π¦πΉ Vienna, Austria', utc: '+01:00'},
  {value: 'Europe/Warsaw', label: 'π΅π± Warsaw, Poland', utc: '+01:00'},
  {value: 'Europe/Athens', label: 'π¬π· Athens, Greece', utc: '+02:00'},
  {value: 'Europe/Bucharest', label: 'π·π΄ Bucharest, Romania', utc: '+02:00'},
  {value: 'Europe/Romania', label: 'πͺπΊ Eastern European', utc: '+02:00'},
  {value: 'Europe/Moscow', label: 'πͺπΊ Further Eastern European', utc: '+03:00'},
  {value: 'Europe/Helsinki', label: 'π«π? Helsinki, Finland', utc: '+02:00'},
  {value: 'Europe/Kiev', label: 'πΊπ¦ Kyiv, Ukraine', utc: '+02:00'},
  {value: 'Europe/Kaliningrad', label: 'π·πΊ Moscow-01 - Kaliningrad', utc: '+02:00'},
  {value: 'Europe/Riga', label: 'π±π» Riga, Latvia', utc: '+02:00'},
  {value: 'Europe/Sofia', label: 'π§π¬ Sofia, Bulgaria', utc: '+02:00'},
  {value: 'Europe/Tallinn', label: 'πͺπͺ Tallinn, Estonia', utc: '+02:00'},
  {value: 'Europe/Vilnius', label: 'π±πΉ Vilnius, Lithuania', utc: '+02:00'},
  {value: 'Europe/Istanbul', label: 'πΉπ· Istanbul, not Constantinople', utc: '+03:00'},
  {value: 'Europe/Minsk', label: 'π§πΎ Minsk, Belarus', utc: '+03:00'},
  {value: 'Europe/Moscow', label: 'π·πΊ Moscow+00 - Moscow', utc: '+03:00'},
  {value: 'Europe/Samara', label: 'π·πΊ Moscow+01 - Samara', utc: '+04:00'},
]

export const Australia: readonly TimezoneOption[] = [
  {value: 'Australia/Perth', label: 'π¦πΊ Australian Western', utc: '+08:00'},
  {value: 'Australia/North', label: 'π¦πΊ Australian Central Standard', utc: '+09:30'},
  {value: 'Australia/Canberra', label: 'π¦πΊ Australian Eastern Standard', utc: '+10:00'},
  {value: 'Australia/Adelaide', label: 'π¦πΊ Adelaide, Australia', utc: '+10:30'},
  {value: 'Australia/Hobart', label: 'π¦πΊ Hobart, Australia', utc: '+11:00'},
  {value: 'Australia/Sydney', label: 'π¦πΊ Eastern Time - Melbourne, Sydney, Australia', utc: '+11:00'},
  {value: 'Australia/LHI', label: 'π¦πΊ Lord Howe Standard', utc: '+10:30'},
]

export const Atlantic: readonly TimezoneOption[] = [
  {value: 'Atlantic/Azores', label: 'π΅πΉ Azores, Portugal', utc: '-01:00'},
  {value: 'Atlantic/Cape_Verde', label: 'π¨π» Cape Verde', utc: '-01:00'},
  {value: 'Atlantic/South_Georgia', label: 'π¬πΈ South Georgia', utc: '-02:00'},
]

export const Africa: readonly TimezoneOption[] = [
  {value: 'Africa/Casablanca', label: 'π²π¦ Casablanca, Morocco', utc: '+00:00'},
  {value: 'Africa/Monrovia', label: 'π±π· Monrovia, Liberia', utc: '+00:00'},
  {value: 'Africa/Algiers', label: 'π©πΏ Algiers, Algeria', utc: '+01:00'},
  {value: 'Africa/Cairo', label: 'πͺπ¬ Cairo, Egypt', utc: '+02:00'},
  {value: 'Africa/Johannesburg', label: 'πΏπ¦ Johannesburg, South Africa', utc: '+02:00'},
  {value: 'Africa/Nairobi', label: 'π°πͺ Nairobi, Kenya', utc: '+03:00'},
]

export const Asia: readonly TimezoneOption[] = [
  {value: 'Asia/Jerusalem', label: 'π?π± Jerusalem, Israel', utc: '+02:00'},
  {value: 'Asia/Baghdad', label: 'π?πΆ Bagdhad, Iraq', utc: '+03:00'},
  {value: 'Asia/Riyadh', label: 'πΈπ¦ Riyadh, Saudi Arabia', utc: '+03:00'},
  {value: 'Asia/Tehran', label: 'π?π· Tehran, Iran', utc: '+03:00'},
  {value: 'Asia/Baku', label: 'π¦πΏ Baku, Azerbaijan', utc: '+04:00'},
  {value: 'Asia/Tbilisi', label: 'π¬πͺ Tbilisi, Georgia', utc: '+04:00'},
  {value: 'Asia/Yerevan', label: 'π¦π² Yerevan, Armenia', utc: '+04:00'},
  {value: 'Asia/Kabul', label: 'π¦π« Kabul, Afghanistan', utc: '+04:30'},
  {value: 'Asia/Karachi', label: 'π΅π° Karachi, Pakistan', utc: '+04:30'},
  {value: 'Asia/Yekaterinburg', label: 'π·πΊ Moscow+02 - Yekaterinburg', utc: '+05:00'},
  {value: 'Asia/Tashkent', label: 'πΊπΏ Tashkent, Uzbekistan', utc: '+05:00'},
  {value: 'Asia/Colombo', label: 'π±π° Colombo, Sri Lanka', utc: '+05:30'},
  {value: 'Asia/Kolkata', label: 'π?π³ Kolkata, India', utc: '+05:30'},
  {value: 'Asia/Almaty', label: 'π°πΏ Almaty, Kazakhstan', utc: '+06:00'},
  {value: 'Asia/Dhaka', label: 'π§π© Dhaka, Bangladesh', utc: '+06:00'},
  {value: 'Asia/Rangoon', label: 'π²π² Rangoon, Myanmar', utc: '+06:30'},
  {value: 'Asia/Bangkok', label: 'πΉπ­ Bangkok, Thailand', utc: '+07:00'},
  {value: 'Asia/Jakarta', label: 'π?π© Jakarta, Indonesia', utc: '+07:00'},
  {value: 'Asia/Krasnoyarsk', label: 'π·πΊ Moscow+04 Krasnoyarsk', utc: '+07:00'},
  {value: 'Asia/Shanghai', label: 'π¨π³ China Time - Beijing', utc: '+08:00'},
  {value: 'Asia/Hong_Kong', label: 'π­π° Hong Kong', utc: '+08:00'},
  {value: 'Asia/Kuala_Lumpur', label: 'π²πΎ Kuala Lumpur, Malaysia', utc: '+08:00'},
  {value: 'Asia/Singapore', label: 'πΈπ¬ Singapore', utc: '+08:00'},
  {value: 'Asia/Taipei', label: 'πΉπΌ Taipei', utc: '+08:00'},
  {value: 'Asia/Ulaanbaatar', label: 'π²π³ Ulaanbaatar', utc: '+08:00'},
  {value: 'Asia/Yakutsk', label: 'π·πΊ Moscow+06 Yakutsk', utc: '+09:00'},
  {value: 'Asia/Seoul', label: 'π°π· Seoul', utc: '+09:00'},
  {value: 'Asia/Tokyo', label: 'π―π΅ Tokyo, Japan', utc: '+09:00'},
  {value: 'Asia/Magadan', label: 'π·πΊ Moscow+07 - Magadan', utc: '+10:00'},
  {value: 'Asia/Vladivostok', label: 'π·πΊ Moscow+07 - Yuzhno-Sakhalinsk', utc: '+10:00'},
  {value: 'Asia/Kamchatka', label: 'π·πΊ Moscow+09 - Petropavlovsk-Kamchatskiy', utc: '+12:00'},
]

export const usTimeZones = [NorthAmerica[0],NorthAmerica[1],NorthAmerica[3],NorthAmerica[4]];
export const defaultTimeZones = [NorthAmerica[0], NorthAmerica[4], Europe[1], Australia[2]];
export interface GroupedOption {
  readonly label: string;
  readonly options: readonly TimezoneOption[];
}

export const allTimezones: readonly TimezoneOption[] = [...NorthAmerica, ...CentralAmerica, ...SouthAmerica, ...Europe, ...Asia, ...Australia, ...Pacific, ...Atlantic, ...Africa];
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