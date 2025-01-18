const mongoose = require('mongoose');
require('dotenv').config();

const Country = require('../Models/country.model');
const { connection } = require('../connection');
const { IST } = require('../../Helpers/dateTime.helper');
// seeder data here
const data = [
    {
        id: '1',
        name: 'Afghanistan',
        code: 'AF',
        phonecode: '93',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '2',
        name: 'Albania',
        code: 'AL',
        phonecode: '355',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '3',
        name: 'Algeria',
        code: 'DZ',
        phonecode: '213',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '4',
        name: 'American Samoa',
        code: 'AS',
        phonecode: '1684',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '5',
        name: 'Andorra',
        code: 'AD',
        phonecode: '376',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '6',
        name: 'Angola',
        code: 'AO',
        phonecode: '244',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '7',
        name: 'Anguilla',
        code: 'AI',
        phonecode: '1264',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '8',
        name: 'Antarctica',
        code: 'AQ',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '9',
        name: 'Antigua And Barbuda',
        code: 'AG',
        phonecode: '1268',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '10',
        name: 'Argentina',
        code: 'AR',
        phonecode: '54',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '11',
        name: 'Armenia',
        code: 'AM',
        phonecode: '374',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '12',
        name: 'Aruba',
        code: 'AW',
        phonecode: '297',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '13',
        name: 'Australia',
        code: 'AU',
        phonecode: '61',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '14',
        name: 'Austria',
        code: 'AT',
        phonecode: '43',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '15',
        name: 'Azerbaijan',
        code: 'AZ',
        phonecode: '994',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '16',
        name: 'Bahamas The',
        code: 'BS',
        phonecode: '1242',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '17',
        name: 'Bahrain',
        code: 'BH',
        phonecode: '973',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '18',
        name: 'Bangladesh',
        code: 'BD',
        phonecode: '880',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '19',
        name: 'Barbados',
        code: 'BB',
        phonecode: '1246',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '20',
        name: 'Belarus',
        code: 'BY',
        phonecode: '375',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '21',
        name: 'Belgium',
        code: 'BE',
        phonecode: '32',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '22',
        name: 'Belize',
        code: 'BZ',
        phonecode: '501',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '23',
        name: 'Benin',
        code: 'BJ',
        phonecode: '229',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '24',
        name: 'Bermuda',
        code: 'BM',
        phonecode: '1441',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '25',
        name: 'Bhutan',
        code: 'BT',
        phonecode: '975',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '26',
        name: 'Bolivia',
        code: 'BO',
        phonecode: '591',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '27',
        name: 'Bosnia and Herzegovina',
        code: 'BA',
        phonecode: '387',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '28',
        name: 'Botswana',
        code: 'BW',
        phonecode: '267',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '29',
        name: 'Bouvet Island',
        code: 'BV',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '30',
        name: 'Brazil',
        code: 'BR',
        phonecode: '55',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '31',
        name: 'British Indian Ocean Territory',
        code: 'IO',
        phonecode: '246',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '32',
        name: 'Brunei',
        code: 'BN',
        phonecode: '673',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '33',
        name: 'Bulgaria',
        code: 'BG',
        phonecode: '359',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '34',
        name: 'Burkina Faso',
        code: 'BF',
        phonecode: '226',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '35',
        name: 'Burundi',
        code: 'BI',
        phonecode: '257',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '36',
        name: 'Cambodia',
        code: 'KH',
        phonecode: '855',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '37',
        name: 'Cameroon',
        code: 'CM',
        phonecode: '237',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '38',
        name: 'Canada',
        code: 'CA',
        phonecode: '1',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '39',
        name: 'Cape Verde',
        code: 'CV',
        phonecode: '238',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '40',
        name: 'Cayman Islands',
        code: 'KY',
        phonecode: '1345',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '41',
        name: 'Central African Republic',
        code: 'CF',
        phonecode: '236',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '42',
        name: 'Chad',
        code: 'TD',
        phonecode: '235',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '43',
        name: 'Chile',
        code: 'CL',
        phonecode: '56',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '44',
        name: 'China',
        code: 'CN',
        phonecode: '86',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '45',
        name: 'Christmas Island',
        code: 'CX',
        phonecode: '61',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '46',
        name: 'Cocos (Keeling) Islands',
        code: 'CC',
        phonecode: '672',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '47',
        name: 'Colombia',
        code: 'CO',
        phonecode: '57',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '48',
        name: 'Comoros',
        code: 'KM',
        phonecode: '269',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '49',
        name: 'Congo',
        code: 'CG',
        phonecode: '242',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '50',
        name: 'Congo The Democratic Republic Of The',
        code: 'CD',
        phonecode: '242',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '51',
        name: 'Cook Islands',
        code: 'CK',
        phonecode: '682',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '52',
        name: 'Costa Rica',
        code: 'CR',
        phonecode: '506',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '53',
        name: "Cote D''Ivoire (Ivory Coast)",
        code: 'CI',
        phonecode: '225',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '54',
        name: 'Croatia (Hrvatska)',
        code: 'HR',
        phonecode: '385',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '55',
        name: 'Cuba',
        code: 'CU',
        phonecode: '53',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '56',
        name: 'Cyprus',
        code: 'CY',
        phonecode: '357',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '57',
        name: 'Czech Republic',
        code: 'CZ',
        phonecode: '420',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '58',
        name: 'Denmark',
        code: 'DK',
        phonecode: '45',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '59',
        name: 'Djibouti',
        code: 'DJ',
        phonecode: '253',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '60',
        name: 'Dominica',
        code: 'DM',
        phonecode: '1767',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '61',
        name: 'Dominican Republic',
        code: 'DO',
        phonecode: '1809',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '62',
        name: 'East Timor',
        code: 'TP',
        phonecode: '670',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '63',
        name: 'Ecuador',
        code: 'EC',
        phonecode: '593',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '64',
        name: 'Egypt',
        code: 'EG',
        phonecode: '20',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '65',
        name: 'El Salvador',
        code: 'SV',
        phonecode: '503',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '66',
        name: 'Equatorial Guinea',
        code: 'GQ',
        phonecode: '240',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '67',
        name: 'Eritrea',
        code: 'ER',
        phonecode: '291',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '68',
        name: 'Estonia',
        code: 'EE',
        phonecode: '372',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '69',
        name: 'Ethiopia',
        code: 'ET',
        phonecode: '251',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '70',
        name: 'External Territories of Australia',
        code: 'XA',
        phonecode: '61',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '71',
        name: 'Falkland Islands',
        code: 'FK',
        phonecode: '500',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '72',
        name: 'Faroe Islands',
        code: 'FO',
        phonecode: '298',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '73',
        name: 'Fiji Islands',
        code: 'FJ',
        phonecode: '679',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '74',
        name: 'Finland',
        code: 'FI',
        phonecode: '358',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '75',
        name: 'France',
        code: 'FR',
        phonecode: '33',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '76',
        name: 'French Guiana',
        code: 'GF',
        phonecode: '594',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '77',
        name: 'French Polynesia',
        code: 'PF',
        phonecode: '689',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '78',
        name: 'French Southern Territories',
        code: 'TF',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '79',
        name: 'Gabon',
        code: 'GA',
        phonecode: '241',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '80',
        name: 'Gambia The',
        code: 'GM',
        phonecode: '220',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '81',
        name: 'Georgia',
        code: 'GE',
        phonecode: '995',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '82',
        name: 'Germany',
        code: 'DE',
        phonecode: '49',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '83',
        name: 'Ghana',
        code: 'GH',
        phonecode: '233',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '84',
        name: 'Gibraltar',
        code: 'GI',
        phonecode: '350',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '85',
        name: 'Greece',
        code: 'GR',
        phonecode: '30',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '86',
        name: 'Greenland',
        code: 'GL',
        phonecode: '299',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '87',
        name: 'Grenada',
        code: 'GD',
        phonecode: '1473',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '88',
        name: 'Guadeloupe',
        code: 'GP',
        phonecode: '590',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '89',
        name: 'Guam',
        code: 'GU',
        phonecode: '1671',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '90',
        name: 'Guatemala',
        code: 'GT',
        phonecode: '502',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '91',
        name: 'Guernsey and Alderney',
        code: 'XU',
        phonecode: '44',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '92',
        name: 'Guinea',
        code: 'GN',
        phonecode: '224',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '93',
        name: 'Guinea-Bissau',
        code: 'GW',
        phonecode: '245',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '94',
        name: 'Guyana',
        code: 'GY',
        phonecode: '592',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '95',
        name: 'Haiti',
        code: 'HT',
        phonecode: '509',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '96',
        name: 'Heard and McDonald Islands',
        code: 'HM',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '97',
        name: 'Honduras',
        code: 'HN',
        phonecode: '504',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '98',
        name: 'Hong Kong S.A.R.',
        code: 'HK',
        phonecode: '852',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '99',
        name: 'Hungary',
        code: 'HU',
        phonecode: '36',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '100',
        name: 'Iceland',
        code: 'IS',
        phonecode: '354',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '101',
        name: 'India',
        code: 'IN',
        phonecode: '91',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '102',
        name: 'Indonesia',
        code: 'ID',
        phonecode: '62',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '103',
        name: 'Iran',
        code: 'IR',
        phonecode: '98',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '104',
        name: 'Iraq',
        code: 'IQ',
        phonecode: '964',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '105',
        name: 'Ireland',
        code: 'IE',
        phonecode: '353',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '106',
        name: 'Israel',
        code: 'IL',
        phonecode: '972',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '107',
        name: 'Italy',
        code: 'IT',
        phonecode: '39',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '108',
        name: 'Jamaica',
        code: 'JM',
        phonecode: '1876',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '109',
        name: 'Japan',
        code: 'JP',
        phonecode: '81',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '110',
        name: 'Jersey',
        code: 'XJ',
        phonecode: '44',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '111',
        name: 'Jordan',
        code: 'JO',
        phonecode: '962',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '112',
        name: 'Kazakhstan',
        code: 'KZ',
        phonecode: '7',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '113',
        name: 'Kenya',
        code: 'KE',
        phonecode: '254',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '114',
        name: 'Kiribati',
        code: 'KI',
        phonecode: '686',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '115',
        name: 'Korea North',
        code: 'KP',
        phonecode: '850',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '116',
        name: 'Korea South',
        code: 'KR',
        phonecode: '82',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '117',
        name: 'Kuwait',
        code: 'KW',
        phonecode: '965',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '118',
        name: 'Kyrgyzstan',
        code: 'KG',
        phonecode: '996',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '119',
        name: 'Laos',
        code: 'LA',
        phonecode: '856',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '120',
        name: 'Latvia',
        code: 'LV',
        phonecode: '371',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '121',
        name: 'Lebanon',
        code: 'LB',
        phonecode: '961',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '122',
        name: 'Lesotho',
        code: 'LS',
        phonecode: '266',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '123',
        name: 'Liberia',
        code: 'LR',
        phonecode: '231',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '124',
        name: 'Libya',
        code: 'LY',
        phonecode: '218',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '125',
        name: 'Liechtenstein',
        code: 'LI',
        phonecode: '423',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '126',
        name: 'Lithuania',
        code: 'LT',
        phonecode: '370',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '127',
        name: 'Luxembourg',
        code: 'LU',
        phonecode: '352',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '128',
        name: 'Macau S.A.R.',
        code: 'MO',
        phonecode: '853',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '129',
        name: 'Macedonia',
        code: 'MK',
        phonecode: '389',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '130',
        name: 'Madagascar',
        code: 'MG',
        phonecode: '261',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '131',
        name: 'Malawi',
        code: 'MW',
        phonecode: '265',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '132',
        name: 'Malaysia',
        code: 'MY',
        phonecode: '60',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '133',
        name: 'Maldives',
        code: 'MV',
        phonecode: '960',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '134',
        name: 'Mali',
        code: 'ML',
        phonecode: '223',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '135',
        name: 'Malta',
        code: 'MT',
        phonecode: '356',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '136',
        name: 'Man (Isle of)',
        code: 'XM',
        phonecode: '44',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '137',
        name: 'Marshall Islands',
        code: 'MH',
        phonecode: '692',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '138',
        name: 'Martinique',
        code: 'MQ',
        phonecode: '596',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '139',
        name: 'Mauritania',
        code: 'MR',
        phonecode: '222',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '140',
        name: 'Mauritius',
        code: 'MU',
        phonecode: '230',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '141',
        name: 'Mayotte',
        code: 'YT',
        phonecode: '269',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '142',
        name: 'Mexico',
        code: 'MX',
        phonecode: '52',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '143',
        name: 'Micronesia',
        code: 'FM',
        phonecode: '691',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '144',
        name: 'Moldova',
        code: 'MD',
        phonecode: '373',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '145',
        name: 'Monaco',
        code: 'MC',
        phonecode: '377',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '146',
        name: 'Mongolia',
        code: 'MN',
        phonecode: '976',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '147',
        name: 'Montserrat',
        code: 'MS',
        phonecode: '1664',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '148',
        name: 'Morocco',
        code: 'MA',
        phonecode: '212',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '149',
        name: 'Mozambique',
        code: 'MZ',
        phonecode: '258',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '150',
        name: 'Myanmar',
        code: 'MM',
        phonecode: '95',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '151',
        name: 'Namibia',
        code: 'NA',
        phonecode: '264',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '152',
        name: 'Nauru',
        code: 'NR',
        phonecode: '674',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '153',
        name: 'Nepal',
        code: 'NP',
        phonecode: '977',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '154',
        name: 'Netherlands Antilles',
        code: 'AN',
        phonecode: '599',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '155',
        name: 'Netherlands The',
        code: 'NL',
        phonecode: '31',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '156',
        name: 'New Caledonia',
        code: 'NC',
        phonecode: '687',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '157',
        name: 'New Zealand',
        code: 'NZ',
        phonecode: '64',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '158',
        name: 'Nicaragua',
        code: 'NI',
        phonecode: '505',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '159',
        name: 'Niger',
        code: 'NE',
        phonecode: '227',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '160',
        name: 'Nigeria',
        code: 'NG',
        phonecode: '234',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '161',
        name: 'Niue',
        code: 'NU',
        phonecode: '683',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '162',
        name: 'Norfolk Island',
        code: 'NF',
        phonecode: '672',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '163',
        name: 'Northern Mariana Islands',
        code: 'MP',
        phonecode: '1670',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '164',
        name: 'Norway',
        code: 'NO',
        phonecode: '47',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '165',
        name: 'Oman',
        code: 'OM',
        phonecode: '968',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '166',
        name: 'Pakistan',
        code: 'PK',
        phonecode: '92',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '167',
        name: 'Palau',
        code: 'PW',
        phonecode: '680',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '168',
        name: 'Palestinian Territory Occupied',
        code: 'PS',
        phonecode: '970',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '169',
        name: 'Panama',
        code: 'PA',
        phonecode: '507',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '170',
        name: 'Papua new Guinea',
        code: 'PG',
        phonecode: '675',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '171',
        name: 'Paraguay',
        code: 'PY',
        phonecode: '595',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '172',
        name: 'Peru',
        code: 'PE',
        phonecode: '51',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '173',
        name: 'Philippines',
        code: 'PH',
        phonecode: '63',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '174',
        name: 'Pitcairn Island',
        code: 'PN',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '175',
        name: 'Poland',
        code: 'PL',
        phonecode: '48',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '176',
        name: 'Portugal',
        code: 'PT',
        phonecode: '351',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '177',
        name: 'Puerto Rico',
        code: 'PR',
        phonecode: '1787',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '178',
        name: 'Qatar',
        code: 'QA',
        phonecode: '974',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '179',
        name: 'Reunion',
        code: 'RE',
        phonecode: '262',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '180',
        name: 'Romania',
        code: 'RO',
        phonecode: '40',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '181',
        name: 'Russia',
        code: 'RU',
        phonecode: '70',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '182',
        name: 'Rwanda',
        code: 'RW',
        phonecode: '250',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '183',
        name: 'Saint Helena',
        code: 'SH',
        phonecode: '290',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '184',
        name: 'Saint Kitts And Nevis',
        code: 'KN',
        phonecode: '1869',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '185',
        name: 'Saint Lucia',
        code: 'LC',
        phonecode: '1758',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '186',
        name: 'Saint Pierre and Miquelon',
        code: 'PM',
        phonecode: '508',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '187',
        name: 'Saint Vincent And The Grenadines',
        code: 'VC',
        phonecode: '1784',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '188',
        name: 'Samoa',
        code: 'WS',
        phonecode: '684',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '189',
        name: 'San Marino',
        code: 'SM',
        phonecode: '378',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '190',
        name: 'Sao Tome and Principe',
        code: 'ST',
        phonecode: '239',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '191',
        name: 'Saudi Arabia',
        code: 'SA',
        phonecode: '966',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '192',
        name: 'Senegal',
        code: 'SN',
        phonecode: '221',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '193',
        name: 'Serbia',
        code: 'RS',
        phonecode: '381',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '194',
        name: 'Seychelles',
        code: 'SC',
        phonecode: '248',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '195',
        name: 'Sierra Leone',
        code: 'SL',
        phonecode: '232',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '196',
        name: 'Singapore',
        code: 'SG',
        phonecode: '65',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '197',
        name: 'Slovakia',
        code: 'SK',
        phonecode: '421',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '198',
        name: 'Slovenia',
        code: 'SI',
        phonecode: '386',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '199',
        name: 'Smaller Territories of the UK',
        code: 'XG',
        phonecode: '44',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '200',
        name: 'Solomon Islands',
        code: 'SB',
        phonecode: '677',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '201',
        name: 'Somalia',
        code: 'SO',
        phonecode: '252',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '202',
        name: 'South Africa',
        code: 'ZA',
        phonecode: '27',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '203',
        name: 'South Georgia',
        code: 'GS',
        phonecode: '0',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '204',
        name: 'South Sudan',
        code: 'SS',
        phonecode: '211',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '205',
        name: 'Spain',
        code: 'ES',
        phonecode: '34',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '206',
        name: 'Sri Lanka',
        code: 'LK',
        phonecode: '94',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '207',
        name: 'Sudan',
        code: 'SD',
        phonecode: '249',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '208',
        name: 'Suriname',
        code: 'SR',
        phonecode: '597',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '209',
        name: 'Svalbard And Jan Mayen Islands',
        code: 'SJ',
        phonecode: '47',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '210',
        name: 'Swaziland',
        code: 'SZ',
        phonecode: '268',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '211',
        name: 'Sweden',
        code: 'SE',
        phonecode: '46',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '212',
        name: 'Switzerland',
        code: 'CH',
        phonecode: '41',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '213',
        name: 'Syria',
        code: 'SY',
        phonecode: '963',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '214',
        name: 'Taiwan',
        code: 'TW',
        phonecode: '886',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '215',
        name: 'Tajikistan',
        code: 'TJ',
        phonecode: '992',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '216',
        name: 'Tanzania',
        code: 'TZ',
        phonecode: '255',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '217',
        name: 'Thailand',
        code: 'TH',
        phonecode: '66',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '218',
        name: 'Togo',
        code: 'TG',
        phonecode: '228',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '219',
        name: 'Tokelau',
        code: 'TK',
        phonecode: '690',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '220',
        name: 'Tonga',
        code: 'TO',
        phonecode: '676',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '221',
        name: 'Trinidad And Tobago',
        code: 'TT',
        phonecode: '1868',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '222',
        name: 'Tunisia',
        code: 'TN',
        phonecode: '216',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '223',
        name: 'Turkey',
        code: 'TR',
        phonecode: '90',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '224',
        name: 'Turkmenistan',
        code: 'TM',
        phonecode: '7370',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '225',
        name: 'Turks And Caicos Islands',
        code: 'TC',
        phonecode: '1649',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '226',
        name: 'Tuvalu',
        code: 'TV',
        phonecode: '688',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '227',
        name: 'Uganda',
        code: 'UG',
        phonecode: '256',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '228',
        name: 'Ukraine',
        code: 'UA',
        phonecode: '380',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '229',
        name: 'United Arab Emirates',
        code: 'AE',
        phonecode: '971',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '230',
        name: 'United Kingdom',
        code: 'GB',
        phonecode: '44',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '231',
        name: 'United States',
        code: 'US',
        phonecode: '1',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '232',
        name: 'United States Minor Outlying Islands',
        code: 'UM',
        phonecode: '1',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '233',
        name: 'Uruguay',
        code: 'UY',
        phonecode: '598',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '234',
        name: 'Uzbekistan',
        code: 'UZ',
        phonecode: '998',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '235',
        name: 'Vanuatu',
        code: 'VU',
        phonecode: '678',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '236',
        name: 'Vatican City State (Holy See)',
        code: 'VA',
        phonecode: '39',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '237',
        name: 'Venezuela',
        code: 'VE',
        phonecode: '58',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '238',
        name: 'Vietnam',
        code: 'VN',
        phonecode: '84',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '239',
        name: 'Virgin Islands (British)',
        code: 'VG',
        phonecode: '1284',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '240',
        name: 'Virgin Islands (US)',
        code: 'VI',
        phonecode: '1340',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '241',
        name: 'Wallis And Futuna Islands',
        code: 'WF',
        phonecode: '681',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '242',
        name: 'Western Sahara',
        code: 'EH',
        phonecode: '212',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '243',
        name: 'Yemen',
        code: 'YE',
        phonecode: '967',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '244',
        name: 'Yugoslavia',
        code: 'YU',
        phonecode: '38',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '245',
        name: 'Zambia',
        code: 'ZM',
        phonecode: '260',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    },
    {
        id: '246',
        name: 'Zimbabwe',
        code: 'ZW',
        phonecode: '263',
        country_active: '0',
        created_at: IST(),
        updated_at: IST()
    }
];

const init = async (data) => {
    try {
        console.log('running seeder !');
        connection();
        Country.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            }
        });
        console.log('adding seeder record/s !');
        Country.insertMany(data, (error, docs) => {
            if (error) console.log(error);
            else console.log('DB seed complete');
            process.exit();
        });

        console.log('running seeder !');
    } catch (error) {
        console.log('Error seeding DB :: ', error?.message);
        process.exit();
    }
};

init(data);
