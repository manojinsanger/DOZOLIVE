const countriesDetails = [
    {
        "name": "Afghanistan",
        "code": "AF",
        "dialCode": "+93",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png"
    },
    {
        "name": "Åland Islands",
        "code": "AX",
        "dialCode": "+35818",
        "flag": "https://flagcdn.com/w320/ax.png"
    },
    {
        "name": "Albania",
        "code": "AL",
        "dialCode": "+355",
        "flag": "https://flagcdn.com/w320/al.png"
    },
    {
        "name": "Algeria",
        "code": "DZ",
        "dialCode": "+213",
        "flag": "https://flagcdn.com/w320/dz.png"
    },
    {
        "name": "American Samoa",
        "code": "AS",
        "dialCode": "+1684",
        "flag": "https://flagcdn.com/w320/as.png"
    },
    {
        "name": "Andorra",
        "code": "AD",
        "dialCode": "+376",
        "flag": "https://flagcdn.com/w320/ad.png"
    },
    {
        "name": "Angola",
        "code": "AO",
        "dialCode": "+244",
        "flag": "https://flagcdn.com/w320/ao.png"
    },
    {
        "name": "Anguilla",
        "code": "AI",
        "dialCode": "+1264",
        "flag": "https://flagcdn.com/w320/ai.png"
    },
    {
        "name": "Antarctica",
        "code": "AQ",
        "dialCode": "undefined",
        "flag": "https://flagcdn.com/w320/aq.png"
    },
    {
        "name": "Antigua and Barbuda",
        "code": "AG",
        "dialCode": "+1268",
        "flag": "https://flagcdn.com/w320/ag.png"
    },
    {
        "name": "Argentina",
        "code": "AR",
        "dialCode": "+54",
        "flag": "https://flagcdn.com/w320/ar.png"
    },
    {
        "name": "Armenia",
        "code": "AM",
        "dialCode": "+374",
        "flag": "https://flagcdn.com/w320/am.png"
    },
    {
        "name": "Aruba",
        "code": "AW",
        "dialCode": "+297",
        "flag": "https://flagcdn.com/w320/aw.png"
    },
    {
        "name": "Australia",
        "code": "AU",
        "dialCode": "+61",
        "flag": "https://flagcdn.com/w320/au.png"
    },
    {
        "name": "Austria",
        "code": "AT",
        "dialCode": "+43",
        "flag": "https://flagcdn.com/w320/at.png"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ",
        "dialCode": "+994",
        "flag": "https://flagcdn.com/w320/az.png"
    },
    {
        "name": "Bahamas",
        "code": "BS",
        "dialCode": "+1242",
        "flag": "https://flagcdn.com/w320/bs.png"
    },
    {
        "name": "Bahrain",
        "code": "BH",
        "dialCode": "+973",
        "flag": "https://flagcdn.com/w320/bh.png"
    },
    {
        "name": "Bangladesh",
        "code": "BD",
        "dialCode": "+880",
        "flag": "https://flagcdn.com/w320/bd.png"
    },
    {
        "name": "Barbados",
        "code": "BB",
        "dialCode": "+1246",
        "flag": "https://flagcdn.com/w320/bb.png"
    },
    {
        "name": "Belarus",
        "code": "BY",
        "dialCode": "+375",
        "flag": "https://flagcdn.com/w320/by.png"
    },
    {
        "name": "Belgium",
        "code": "BE",
        "dialCode": "+32",
        "flag": "https://flagcdn.com/w320/be.png"
    },
    {
        "name": "Belize",
        "code": "BZ",
        "dialCode": "+501",
        "flag": "https://flagcdn.com/w320/bz.png"
    },
    {
        "name": "Benin",
        "code": "BJ",
        "dialCode": "+229",
        "flag": "https://flagcdn.com/w320/bj.png"
    },
    {
        "name": "Bermuda",
        "code": "BM",
        "dialCode": "+1441",
        "flag": "https://flagcdn.com/w320/bm.png"
    },
    {
        "name": "Bhutan",
        "code": "BT",
        "dialCode": "+975",
        "flag": "https://flagcdn.com/w320/bt.png"
    },
    {
        "name": "Bolivia",
        "code": "BO",
        "dialCode": "+591",
        "flag": "https://flagcdn.com/w320/bo.png"
    },
    {
        "name": "Bosnia and Herzegovina",
        "code": "BA",
        "dialCode": "+387",
        "flag": "https://flagcdn.com/w320/ba.png"
    },
    {
        "name": "Botswana",
        "code": "BW",
        "dialCode": "+267",
        "flag": "https://flagcdn.com/w320/bw.png"
    },
    {
        "name": "Bouvet Island",
        "code": "BV",
        "dialCode": "+47",
        "flag": "https://flagcdn.com/w320/bv.png"
    },
    {
        "name": "Brazil",
        "code": "BR",
        "dialCode": "+55",
        "flag": "https://flagcdn.com/w320/br.png"
    },
    {
        "name": "British Indian Ocean Territory",
        "code": "IO",
        "dialCode": "+246",
        "flag": "https://flagcdn.com/w320/io.png"
    },
    {
        "name": "British Virgin Islands",
        "code": "VG",
        "dialCode": "+1284",
        "flag": "https://flagcdn.com/w320/vg.png"
    },
    {
        "name": "Brunei",
        "code": "BN",
        "dialCode": "+673",
        "flag": "https://flagcdn.com/w320/bn.png"
    },
    {
        "name": "Bulgaria",
        "code": "BG",
        "dialCode": "+359",
        "flag": "https://flagcdn.com/w320/bg.png"
    },
    {
        "name": "Burkina Faso",
        "code": "BF",
        "dialCode": "+226",
        "flag": "https://flagcdn.com/w320/bf.png"
    },
    {
        "name": "Burundi",
        "code": "BI",
        "dialCode": "+257",
        "flag": "https://flagcdn.com/w320/bi.png"
    },
    {
        "name": "Cambodia",
        "code": "KH",
        "dialCode": "+855",
        "flag": "https://flagcdn.com/w320/kh.png"
    },
    {
        "name": "Cameroon",
        "code": "CM",
        "dialCode": "+237",
        "flag": "https://flagcdn.com/w320/cm.png"
    },
    {
        "name": "Canada",
        "code": "CA",
        "dialCode": "+1",
        "flag": "https://flagcdn.com/w320/ca.png"
    },
    {
        "name": "Cape Verde",
        "code": "CV",
        "dialCode": "+238",
        "flag": "https://flagcdn.com/w320/cv.png"
    },
    {
        "name": "Caribbean Netherlands",
        "code": "BQ",
        "dialCode": "+599",
        "flag": "https://flagcdn.com/w320/bq.png"
    },
    {
        "name": "Cayman Islands",
        "code": "KY",
        "dialCode": "+1345",
        "flag": "https://flagcdn.com/w320/ky.png"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "dialCode": "+236",
        "flag": "https://flagcdn.com/w320/cf.png"
    },
    {
        "name": "Chad",
        "code": "TD",
        "dialCode": "+235",
        "flag": "https://flagcdn.com/w320/td.png"
    },
    {
        "name": "Chile",
        "code": "CL",
        "dialCode": "+56",
        "flag": "https://flagcdn.com/w320/cl.png"
    },
    {
        "name": "China",
        "code": "CN",
        "dialCode": "+86",
        "flag": "https://flagcdn.com/w320/cn.png"
    },
    {
        "name": "Christmas Island",
        "code": "CX",
        "dialCode": "+61",
        "flag": "https://flagcdn.com/w320/cx.png"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "code": "CC",
        "dialCode": "+61",
        "flag": "https://flagcdn.com/w320/cc.png"
    },
    {
        "name": "Colombia",
        "code": "CO",
        "dialCode": "+57",
        "flag": "https://flagcdn.com/w320/co.png"
    },
    {
        "name": "Comoros",
        "code": "KM",
        "dialCode": "+269",
        "flag": "https://flagcdn.com/w320/km.png"
    },
    {
        "name": "Cook Islands",
        "code": "CK",
        "dialCode": "+682",
        "flag": "https://flagcdn.com/w320/ck.png"
    },
    {
        "name": "Costa Rica",
        "code": "CR",
        "dialCode": "+506",
        "flag": "https://flagcdn.com/w320/cr.png"
    },
    {
        "name": "Croatia",
        "code": "HR",
        "dialCode": "+385",
        "flag": "https://flagcdn.com/w320/hr.png"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "dialCode": "+53",
        "flag": "https://flagcdn.com/w320/cu.png"
    },
    {
        "name": "Curaçao",
        "code": "CW",
        "dialCode": "+599",
        "flag": "https://flagcdn.com/w320/cw.png"
    },
    {
        "name": "Cyprus",
        "code": "CY",
        "dialCode": "+357",
        "flag": "https://flagcdn.com/w320/cy.png"
    },
    {
        "name": "Czechia",
        "code": "CZ",
        "dialCode": "+420",
        "flag": "https://flagcdn.com/w320/cz.png"
    },
    {
        "name": "Denmark",
        "code": "DK",
        "dialCode": "+45",
        "flag": "https://flagcdn.com/w320/dk.png"
    },
    {
        "name": "Djibouti",
        "code": "DJ",
        "dialCode": "+253",
        "flag": "https://flagcdn.com/w320/dj.png"
    },
    {
        "name": "Dominica",
        "code": "DM",
        "dialCode": "+1767",
        "flag": "https://flagcdn.com/w320/dm.png"
    },
    {
        "name": "Dominican Republic",
        "code": "DO",
        "dialCode": "+1809",
        "flag": "https://flagcdn.com/w320/do.png"
    },
    {
        "name": "DR Congo",
        "code": "CD",
        "dialCode": "+243",
        "flag": "https://flagcdn.com/w320/cd.png"
    },
    {
        "name": "Ecuador",
        "code": "EC",
        "dialCode": "+593",
        "flag": "https://flagcdn.com/w320/ec.png"
    },
    {
        "name": "Egypt",
        "code": "EG",
        "dialCode": "+20",
        "flag": "https://flagcdn.com/w320/eg.png"
    },
    {
        "name": "El Salvador",
        "code": "SV",
        "dialCode": "+503",
        "flag": "https://flagcdn.com/w320/sv.png"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ",
        "dialCode": "+240",
        "flag": "https://flagcdn.com/w320/gq.png"
    },
    {
        "name": "Eritrea",
        "code": "ER",
        "dialCode": "+291",
        "flag": "https://flagcdn.com/w320/er.png"
    },
    {
        "name": "Estonia",
        "code": "EE",
        "dialCode": "+372",
        "flag": "https://flagcdn.com/w320/ee.png"
    },
    {
        "name": "Eswatini",
        "code": "SZ",
        "dialCode": "+268",
        "flag": "https://flagcdn.com/w320/sz.png"
    },
    {
        "name": "Ethiopia",
        "code": "ET",
        "dialCode": "+251",
        "flag": "https://flagcdn.com/w320/et.png"
    },
    {
        "name": "Falkland Islands",
        "code": "FK",
        "dialCode": "+500",
        "flag": "https://flagcdn.com/w320/fk.png"
    },
    {
        "name": "Faroe Islands",
        "code": "FO",
        "dialCode": "+298",
        "flag": "https://flagcdn.com/w320/fo.png"
    },
    {
        "name": "Fiji",
        "code": "FJ",
        "dialCode": "+679",
        "flag": "https://flagcdn.com/w320/fj.png"
    },
    {
        "name": "Finland",
        "code": "FI",
        "dialCode": "+358",
        "flag": "https://flagcdn.com/w320/fi.png"
    },
    {
        "name": "France",
        "code": "FR",
        "dialCode": "+33",
        "flag": "https://flagcdn.com/w320/fr.png"
    },
    {
        "name": "French Guiana",
        "code": "GF",
        "dialCode": "+594",
        "flag": "https://flagcdn.com/w320/gf.png"
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "dialCode": "+689",
        "flag": "https://flagcdn.com/w320/pf.png"
    },
    {
        "name": "French Southern and Antarctic Lands",
        "code": "TF",
        "dialCode": "+262",
        "flag": "https://flagcdn.com/w320/tf.png"
    },
    {
        "name": "Gabon",
        "code": "GA",
        "dialCode": "+241",
        "flag": "https://flagcdn.com/w320/ga.png"
    },
    {
        "name": "Gambia",
        "code": "GM",
        "dialCode": "+220",
        "flag": "https://flagcdn.com/w320/gm.png"
    },
    {
        "name": "Georgia",
        "code": "GE",
        "dialCode": "+995",
        "flag": "https://flagcdn.com/w320/ge.png"
    },
    {
        "name": "Germany",
        "code": "DE",
        "dialCode": "+49",
        "flag": "https://flagcdn.com/w320/de.png"
    },
    {
        "name": "Ghana",
        "code": "GH",
        "dialCode": "+233",
        "flag": "https://flagcdn.com/w320/gh.png"
    },
    {
        "name": "Gibraltar",
        "code": "GI",
        "dialCode": "+350",
        "flag": "https://flagcdn.com/w320/gi.png"
    },
    {
        "name": "Greece",
        "code": "GR",
        "dialCode": "+30",
        "flag": "https://flagcdn.com/w320/gr.png"
    },
    {
        "name": "Greenland",
        "code": "GL",
        "dialCode": "+299",
        "flag": "https://flagcdn.com/w320/gl.png"
    },
    {
        "name": "Grenada",
        "code": "GD",
        "dialCode": "+1473",
        "flag": "https://flagcdn.com/w320/gd.png"
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "dialCode": "+590",
        "flag": "https://flagcdn.com/w320/gp.png"
    },
    {
        "name": "Guam",
        "code": "GU",
        "dialCode": "+1671",
        "flag": "https://flagcdn.com/w320/gu.png"
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "dialCode": "+502",
        "flag": "https://flagcdn.com/w320/gt.png"
    },
    {
        "name": "Guernsey",
        "code": "GG",
        "dialCode": "+44",
        "flag": "https://flagcdn.com/w320/gg.png"
    },
    {
        "name": "Guinea",
        "code": "GN",
        "dialCode": "+224",
        "flag": "https://flagcdn.com/w320/gn.png"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "dialCode": "+245",
        "flag": "https://flagcdn.com/w320/gw.png"
    },
    {
        "name": "Guyana",
        "code": "GY",
        "dialCode": "+592",
        "flag": "https://flagcdn.com/w320/gy.png"
    },
    {
        "name": "Haiti",
        "code": "HT",
        "dialCode": "+509",
        "flag": "https://flagcdn.com/w320/ht.png"
    },
    {
        "name": "Heard Island and McDonald Islands",
        "code": "HM",
        "dialCode": "undefined",
        "flag": "https://flagcdn.com/w320/hm.png"
    },
    {
        "name": "Honduras",
        "code": "HN",
        "dialCode": "+504",
        "flag": "https://flagcdn.com/w320/hn.png"
    },
    {
        "name": "Hong Kong",
        "code": "HK",
        "dialCode": "+852",
        "flag": "https://flagcdn.com/w320/hk.png"
    },
    {
        "name": "Hungary",
        "code": "HU",
        "dialCode": "+36",
        "flag": "https://flagcdn.com/w320/hu.png"
    },
    {
        "name": "Iceland",
        "code": "IS",
        "dialCode": "+354",
        "flag": "https://flagcdn.com/w320/is.png"
    },
    {
        "name": "India",
        "code": "IN",
        "dialCode": "+91",
        "flag": "https://flagcdn.com/w320/in.png"
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "dialCode": "+62",
        "flag": "https://flagcdn.com/w320/id.png"
    },
    {
        "name": "Iran",
        "code": "IR",
        "dialCode": "+98",
        "flag": "https://flagcdn.com/w320/ir.png"
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "dialCode": "+964",
        "flag": "https://flagcdn.com/w320/iq.png"
    },
    {
        "name": "Ireland",
        "code": "IE",
        "dialCode": "+353",
        "flag": "https://flagcdn.com/w320/ie.png"
    },
    {
        "name": "Isle of Man",
        "code": "IM",
        "dialCode": "+44",
        "flag": "https://flagcdn.com/w320/im.png"
    },
    {
        "name": "Israel",
        "code": "IL",
        "dialCode": "+972",
        "flag": "https://flagcdn.com/w320/il.png"
    },
    {
        "name": "Italy",
        "code": "IT",
        "dialCode": "+39",
        "flag": "https://flagcdn.com/w320/it.png"
    },
    {
        "name": "Ivory Coast",
        "code": "CI",
        "dialCode": "+225",
        "flag": "https://flagcdn.com/w320/ci.png"
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "dialCode": "+1876",
        "flag": "https://flagcdn.com/w320/jm.png"
    },
    {
        "name": "Japan",
        "code": "JP",
        "dialCode": "+81",
        "flag": "https://flagcdn.com/w320/jp.png"
    },
    {
        "name": "Jersey",
        "code": "JE",
        "dialCode": "+44",
        "flag": "https://flagcdn.com/w320/je.png"
    },
    {
        "name": "Jordan",
        "code": "JO",
        "dialCode": "+962",
        "flag": "https://flagcdn.com/w320/jo.png"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "dialCode": "+76",
        "flag": "https://flagcdn.com/w320/kz.png"
    },
    {
        "name": "Kenya",
        "code": "KE",
        "dialCode": "+254",
        "flag": "https://flagcdn.com/w320/ke.png"
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "dialCode": "+686",
        "flag": "https://flagcdn.com/w320/ki.png"
    },
    {
        "name": "Kosovo",
        "code": "XK",
        "dialCode": "+383",
        "flag": "https://flagcdn.com/w320/xk.png"
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "dialCode": "+965",
        "flag": "https://flagcdn.com/w320/kw.png"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "dialCode": "+996",
        "flag": "https://flagcdn.com/w320/kg.png"
    },
    {
        "name": "Laos",
        "code": "LA",
        "dialCode": "+856",
        "flag": "https://flagcdn.com/w320/la.png"
    },
    {
        "name": "Latvia",
        "code": "LV",
        "dialCode": "+371",
        "flag": "https://flagcdn.com/w320/lv.png"
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "dialCode": "+961",
        "flag": "https://flagcdn.com/w320/lb.png"
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "dialCode": "+266",
        "flag": "https://flagcdn.com/w320/ls.png"
    },
    {
        "name": "Liberia",
        "code": "LR",
        "dialCode": "+231",
        "flag": "https://flagcdn.com/w320/lr.png"
    },
    {
        "name": "Libya",
        "code": "LY",
        "dialCode": "+218",
        "flag": "https://flagcdn.com/w320/ly.png"
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "dialCode": "+423",
        "flag": "https://flagcdn.com/w320/li.png"
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "dialCode": "+370",
        "flag": "https://flagcdn.com/w320/lt.png"
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "dialCode": "+352",
        "flag": "https://flagcdn.com/w320/lu.png"
    },
    {
        "name": "Macau",
        "code": "MO",
        "dialCode": "+853",
        "flag": "https://flagcdn.com/w320/mo.png"
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "dialCode": "+261",
        "flag": "https://flagcdn.com/w320/mg.png"
    },
    {
        "name": "Malawi",
        "code": "MW",
        "dialCode": "+265",
        "flag": "https://flagcdn.com/w320/mw.png"
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "dialCode": "+60",
        "flag": "https://flagcdn.com/w320/my.png"
    },
    {
        "name": "Maldives",
        "code": "MV",
        "dialCode": "+960",
        "flag": "https://flagcdn.com/w320/mv.png"
    },
    {
        "name": "Mali",
        "code": "ML",
        "dialCode": "+223",
        "flag": "https://flagcdn.com/w320/ml.png"
    },
    {
        "name": "Malta",
        "code": "MT",
        "dialCode": "+356",
        "flag": "https://flagcdn.com/w320/mt.png"
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "dialCode": "+692",
        "flag": "https://flagcdn.com/w320/mh.png"
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "dialCode": "+596",
        "flag": "https://flagcdn.com/w320/mq.png"
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "dialCode": "+222",
        "flag": "https://flagcdn.com/w320/mr.png"
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "dialCode": "+230",
        "flag": "https://flagcdn.com/w320/mu.png"
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "dialCode": "+262",
        "flag": "https://flagcdn.com/w320/yt.png"
    },
    {
        "name": "Mexico",
        "code": "MX",
        "dialCode": "+52",
        "flag": "https://flagcdn.com/w320/mx.png"
    },
    {
        "name": "Micronesia",
        "code": "FM",
        "dialCode": "+691",
        "flag": "https://flagcdn.com/w320/fm.png"
    },
    {
        "name": "Moldova",
        "code": "MD",
        "dialCode": "+373",
        "flag": "https://flagcdn.com/w320/md.png"
    },
    {
        "name": "Monaco",
        "code": "MC",
        "dialCode": "+377",
        "flag": "https://flagcdn.com/w320/mc.png"
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "dialCode": "+976",
        "flag": "https://flagcdn.com/w320/mn.png"
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "dialCode": "+382",
        "flag": "https://flagcdn.com/w320/me.png"
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "dialCode": "+1664",
        "flag": "https://flagcdn.com/w320/ms.png"
    },
    {
        "name": "Morocco",
        "code": "MA",
        "dialCode": "+212",
        "flag": "https://flagcdn.com/w320/ma.png"
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "dialCode": "+258",
        "flag": "https://flagcdn.com/w320/mz.png"
    },
    {
        "name": "Myanmar",
        "code": "MM",
        "dialCode": "+95",
        "flag": "https://flagcdn.com/w320/mm.png"
    },
    {
        "name": "Namibia",
        "code": "NA",
        "dialCode": "+264",
        "flag": "https://flagcdn.com/w320/na.png"
    },
    {
        "name": "Nauru",
        "code": "NR",
        "dialCode": "+674",
        "flag": "https://flagcdn.com/w320/nr.png"
    },
    {
        "name": "Nepal",
        "code": "NP",
        "dialCode": "+977",
        "flag": "https://flagcdn.com/w320/np.png"
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "dialCode": "+31",
        "flag": "https://flagcdn.com/w320/nl.png"
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "dialCode": "+687",
        "flag": "https://flagcdn.com/w320/nc.png"
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "dialCode": "+64",
        "flag": "https://flagcdn.com/w320/nz.png"
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "dialCode": "+505",
        "flag": "https://flagcdn.com/w320/ni.png"
    },
    {
        "name": "Niger",
        "code": "NE",
        "dialCode": "+227",
        "flag": "https://flagcdn.com/w320/ne.png"
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "dialCode": "+234",
        "flag": "https://flagcdn.com/w320/ng.png"
    },
    {
        "name": "Niue",
        "code": "NU",
        "dialCode": "+683",
        "flag": "https://flagcdn.com/w320/nu.png"
    },
    {
        "name": "Norfolk Island",
        "code": "NF",
        "dialCode": "+672",
        "flag": "https://flagcdn.com/w320/nf.png"
    },
    {
        "name": "North Korea",
        "code": "KP",
        "dialCode": "+850",
        "flag": "https://flagcdn.com/w320/kp.png"
    },
    {
        "name": "North Macedonia",
        "code": "MK",
        "dialCode": "+389",
        "flag": "https://flagcdn.com/w320/mk.png"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP",
        "dialCode": "+1670",
        "flag": "https://flagcdn.com/w320/mp.png"
    },
    {
        "name": "Norway",
        "code": "NO",
        "dialCode": "+47",
        "flag": "https://flagcdn.com/w320/no.png"
    },
    {
        "name": "Oman",
        "code": "OM",
        "dialCode": "+968",
        "flag": "https://flagcdn.com/w320/om.png"
    },
    {
        "name": "Pakistan",
        "code": "PK",
        "dialCode": "+92",
        "flag": "https://flagcdn.com/w320/pk.png"
    },
    {
        "name": "Palau",
        "code": "PW",
        "dialCode": "+680",
        "flag": "https://flagcdn.com/w320/pw.png"
    },
    {
        "name": "Palestine",
        "code": "PS",
        "dialCode": "+970",
        "flag": "https://flagcdn.com/w320/ps.png"
    },
    {
        "name": "Panama",
        "code": "PA",
        "dialCode": "+507",
        "flag": "https://flagcdn.com/w320/pa.png"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG",
        "dialCode": "+675",
        "flag": "https://flagcdn.com/w320/pg.png"
    },
    {
        "name": "Paraguay",
        "code": "PY",
        "dialCode": "+595",
        "flag": "https://flagcdn.com/w320/py.png"
    },
    {
        "name": "Peru",
        "code": "PE",
        "dialCode": "+51",
        "flag": "https://flagcdn.com/w320/pe.png"
    },
    {
        "name": "Philippines",
        "code": "PH",
        "dialCode": "+63",
        "flag": "https://flagcdn.com/w320/ph.png"
    },
    {
        "name": "Pitcairn Islands",
        "code": "PN",
        "dialCode": "+64",
        "flag": "https://flagcdn.com/w320/pn.png"
    },
    {
        "name": "Poland",
        "code": "PL",
        "dialCode": "+48",
        "flag": "https://flagcdn.com/w320/pl.png"
    },
    {
        "name": "Portugal",
        "code": "PT",
        "dialCode": "+351",
        "flag": "https://flagcdn.com/w320/pt.png"
    },
    {
        "name": "Puerto Rico",
        "code": "PR",
        "dialCode": "+1787",
        "flag": "https://flagcdn.com/w320/pr.png"
    },
    {
        "name": "Qatar",
        "code": "QA",
        "dialCode": "+974",
        "flag": "https://flagcdn.com/w320/qa.png"
    },
    {
        "name": "Republic of the Congo",
        "code": "CG",
        "dialCode": "+242",
        "flag": "https://flagcdn.com/w320/cg.png"
    },
    {
        "name": "Réunion",
        "code": "RE",
        "dialCode": "+262",
        "flag": "https://flagcdn.com/w320/re.png"
    },
    {
        "name": "Romania",
        "code": "RO",
        "dialCode": "+40",
        "flag": "https://flagcdn.com/w320/ro.png"
    },
    {
        "name": "Russia",
        "code": "RU",
        "dialCode": "+73",
        "flag": "https://flagcdn.com/w320/ru.png"
    },
    {
        "name": "Rwanda",
        "code": "RW",
        "dialCode": "+250",
        "flag": "https://flagcdn.com/w320/rw.png"
    },
    {
        "name": "Saint Barthélemy",
        "code": "BL",
        "dialCode": "+590",
        "flag": "https://flagcdn.com/w320/bl.png"
    },
    {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "code": "SH",
        "dialCode": "+290",
        "flag": "https://flagcdn.com/w320/sh.png"
    },
    {
        "name": "Saint Kitts and Nevis",
        "code": "KN",
        "dialCode": "+1869",
        "flag": "https://flagcdn.com/w320/kn.png"
    },
    {
        "name": "Saint Lucia",
        "code": "LC",
        "dialCode": "+1758",
        "flag": "https://flagcdn.com/w320/lc.png"
    },
    {
        "name": "Saint Martin",
        "code": "MF",
        "dialCode": "+590",
        "flag": "https://flagcdn.com/w320/mf.png"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "code": "PM",
        "dialCode": "+508",
        "flag": "https://flagcdn.com/w320/pm.png"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC",
        "dialCode": "+1784",
        "flag": "https://flagcdn.com/w320/vc.png"
    },
    {
        "name": "Samoa",
        "code": "WS",
        "dialCode": "+685",
        "flag": "https://flagcdn.com/w320/ws.png"
    },
    {
        "name": "San Marino",
        "code": "SM",
        "dialCode": "+378",
        "flag": "https://flagcdn.com/w320/sm.png"
    },
    {
        "name": "São Tomé and Príncipe",
        "code": "ST",
        "dialCode": "+239",
        "flag": "https://flagcdn.com/w320/st.png"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA",
        "dialCode": "+966",
        "flag": "https://flagcdn.com/w320/sa.png"
    },
    {
        "name": "Senegal",
        "code": "SN",
        "dialCode": "+221",
        "flag": "https://flagcdn.com/w320/sn.png"
    },
    {
        "name": "Serbia",
        "code": "RS",
        "dialCode": "+381",
        "flag": "https://flagcdn.com/w320/rs.png"
    },
    {
        "name": "Seychelles",
        "code": "SC",
        "dialCode": "+248",
        "flag": "https://flagcdn.com/w320/sc.png"
    },
    {
        "name": "Sierra Leone",
        "code": "SL",
        "dialCode": "+232",
        "flag": "https://flagcdn.com/w320/sl.png"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "dialCode": "+65",
        "flag": "https://flagcdn.com/w320/sg.png"
    },
    {
        "name": "Sint Maarten",
        "code": "SX",
        "dialCode": "+1721",
        "flag": "https://flagcdn.com/w320/sx.png"
    },
    {
        "name": "Slovakia",
        "code": "SK",
        "dialCode": "+421",
        "flag": "https://flagcdn.com/w320/sk.png"
    },
    {
        "name": "Slovenia",
        "code": "SI",
        "dialCode": "+386",
        "flag": "https://flagcdn.com/w320/si.png"
    },
    {
        "name": "Solomon Islands",
        "code": "SB",
        "dialCode": "+677",
        "flag": "https://flagcdn.com/w320/sb.png"
    },
    {
        "name": "Somalia",
        "code": "SO",
        "dialCode": "+252",
        "flag": "https://flagcdn.com/w320/so.png"
    },
    {
        "name": "South Africa",
        "code": "ZA",
        "dialCode": "+27",
        "flag": "https://flagcdn.com/w320/za.png"
    },
    {
        "name": "South Georgia",
        "code": "GS",
        "dialCode": "+500",
        "flag": "https://flagcdn.com/w320/gs.png"
    },
    {
        "name": "South Korea",
        "code": "KR",
        "dialCode": "+82",
        "flag": "https://flagcdn.com/w320/kr.png"
    },
    {
        "name": "South Sudan",
        "code": "SS",
        "dialCode": "+211",
        "flag": "https://flagcdn.com/w320/ss.png"
    },
    {
        "name": "Spain",
        "code": "ES",
        "dialCode": "+34",
        "flag": "https://flagcdn.com/w320/es.png"
    },
    {
        "name": "Sri Lanka",
        "code": "LK",
        "dialCode": "+94",
        "flag": "https://flagcdn.com/w320/lk.png"
    },
    {
        "name": "Sudan",
        "code": "SD",
        "dialCode": "+249",
        "flag": "https://flagcdn.com/w320/sd.png"
    },
    {
        "name": "Suriname",
        "code": "SR",
        "dialCode": "+597",
        "flag": "https://flagcdn.com/w320/sr.png"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "code": "SJ",
        "dialCode": "+4779",
        "flag": "https://flagcdn.com/w320/sj.png"
    },
    {
        "name": "Sweden",
        "code": "SE",
        "dialCode": "+46",
        "flag": "https://flagcdn.com/w320/se.png"
    },
    {
        "name": "Switzerland",
        "code": "CH",
        "dialCode": "+41",
        "flag": "https://flagcdn.com/w320/ch.png"
    },
    {
        "name": "Syria",
        "code": "SY",
        "dialCode": "+963",
        "flag": "https://flagcdn.com/w320/sy.png"
    },
    {
        "name": "Taiwan",
        "code": "TW",
        "dialCode": "+886",
        "flag": "https://flagcdn.com/w320/tw.png"
    },
    {
        "name": "Tajikistan",
        "code": "TJ",
        "dialCode": "+992",
        "flag": "https://flagcdn.com/w320/tj.png"
    },
    {
        "name": "Tanzania",
        "code": "TZ",
        "dialCode": "+255",
        "flag": "https://flagcdn.com/w320/tz.png"
    },
    {
        "name": "Thailand",
        "code": "TH",
        "dialCode": "+66",
        "flag": "https://flagcdn.com/w320/th.png"
    },
    {
        "name": "Timor-Leste",
        "code": "TL",
        "dialCode": "+670",
        "flag": "https://flagcdn.com/w320/tl.png"
    },
    {
        "name": "Togo",
        "code": "TG",
        "dialCode": "+228",
        "flag": "https://flagcdn.com/w320/tg.png"
    },
    {
        "name": "Tokelau",
        "code": "TK",
        "dialCode": "+690",
        "flag": "https://flagcdn.com/w320/tk.png"
    },
    {
        "name": "Tonga",
        "code": "TO",
        "dialCode": "+676",
        "flag": "https://flagcdn.com/w320/to.png"
    },
    {
        "name": "Trinidad and Tobago",
        "code": "TT",
        "dialCode": "+1868",
        "flag": "https://flagcdn.com/w320/tt.png"
    },
    {
        "name": "Tunisia",
        "code": "TN",
        "dialCode": "+216",
        "flag": "https://flagcdn.com/w320/tn.png"
    },
    {
        "name": "Turkey",
        "code": "TR",
        "dialCode": "+90",
        "flag": "https://flagcdn.com/w320/tr.png"
    },
    {
        "name": "Turkmenistan",
        "code": "TM",
        "dialCode": "+993",
        "flag": "https://flagcdn.com/w320/tm.png"
    },
    {
        "name": "Turks and Caicos Islands",
        "code": "TC",
        "dialCode": "+1649",
        "flag": "https://flagcdn.com/w320/tc.png"
    },
    {
        "name": "Tuvalu",
        "code": "TV",
        "dialCode": "+688",
        "flag": "https://flagcdn.com/w320/tv.png"
    },
    {
        "name": "Uganda",
        "code": "UG",
        "dialCode": "+256",
        "flag": "https://flagcdn.com/w320/ug.png"
    },
    {
        "name": "Ukraine",
        "code": "UA",
        "dialCode": "+380",
        "flag": "https://flagcdn.com/w320/ua.png"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE",
        "dialCode": "+971",
        "flag": "https://flagcdn.com/w320/ae.png"
    },
    {
        "name": "United Kingdom",
        "code": "GB",
        "dialCode": "+44",
        "flag": "https://flagcdn.com/w320/gb.png"
    },
    {
        "name": "United States",
        "code": "US",
        "dialCode": "+1201",
        "flag": "https://flagcdn.com/w320/us.png"
    },
    {
        "name": "United States Minor Outlying Islands",
        "code": "UM",
        "dialCode": "+268",
        "flag": "https://flagcdn.com/w320/um.png"
    },
    {
        "name": "United States Virgin Islands",
        "code": "VI",
        "dialCode": "+1340",
        "flag": "https://flagcdn.com/w320/vi.png"
    },
    {
        "name": "Uruguay",
        "code": "UY",
        "dialCode": "+598",
        "flag": "https://flagcdn.com/w320/uy.png"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ",
        "dialCode": "+998",
        "flag": "https://flagcdn.com/w320/uz.png"
    },
    {
        "name": "Vanuatu",
        "code": "VU",
        "dialCode": "+678",
        "flag": "https://flagcdn.com/w320/vu.png"
    },
    {
        "name": "Vatican City",
        "code": "VA",
        "dialCode": "+3906698",
        "flag": "https://flagcdn.com/w320/va.png"
    },
    {
        "name": "Venezuela",
        "code": "VE",
        "dialCode": "+58",
        "flag": "https://flagcdn.com/w320/ve.png"
    },
    {
        "name": "Vietnam",
        "code": "VN",
        "dialCode": "+84",
        "flag": "https://flagcdn.com/w320/vn.png"
    },
    {
        "name": "Wallis and Futuna",
        "code": "WF",
        "dialCode": "+681",
        "flag": "https://flagcdn.com/w320/wf.png"
    },
    {
        "name": "Western Sahara",
        "code": "EH",
        "dialCode": "+2125288",
        "flag": "https://flagcdn.com/w320/eh.png"
    },
    {
        "name": "Yemen",
        "code": "YE",
        "dialCode": "+967",
        "flag": "https://flagcdn.com/w320/ye.png"
    },
    {
        "name": "Zambia",
        "code": "ZM",
        "dialCode": "+260",
        "flag": "https://flagcdn.com/w320/zm.png"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW",
        "dialCode": "+263",
        "flag": "https://flagcdn.com/w320/zw.png"
    }
]
export default countriesDetails;