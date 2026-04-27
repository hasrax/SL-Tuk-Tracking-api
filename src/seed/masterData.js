const provinces = [
  { code: "WP", name: "Western" },
  { code: "CP", name: "Central" },
  { code: "SP", name: "Southern" },
  { code: "NP", name: "Northern" },
  { code: "EP", name: "Eastern" },
  { code: "NWP", name: "North Western" },
  { code: "NC", name: "North Central" },
  { code: "UP", name: "Uva" },
  { code: "SGP", name: "Sabaragamuwa" }
];

const districts = [
  { code: "CO", name: "Colombo", provinceCode: "WP" },
  { code: "GA", name: "Gampaha", provinceCode: "WP" },
  { code: "KL", name: "Kalutara", provinceCode: "WP" },

  { code: "KY", name: "Kandy", provinceCode: "CP" },
  { code: "MT", name: "Matale", provinceCode: "CP" },
  { code: "NW", name: "Nuwara Eliya", provinceCode: "CP" },

  { code: "GL", name: "Galle", provinceCode: "SP" },
  { code: "MTB", name: "Matara", provinceCode: "SP" },
  { code: "HB", name: "Hambantota", provinceCode: "SP" },

  { code: "JN", name: "Jaffna", provinceCode: "NP" },
  { code: "KLN", name: "Kilinochchi", provinceCode: "NP" },
  { code: "MN", name: "Mannar", provinceCode: "NP" },
  { code: "MV", name: "Mullaitivu", provinceCode: "NP" },
  { code: "VP", name: "Vavuniya", provinceCode: "NP" },

  { code: "TR", name: "Trincomalee", provinceCode: "EP" },
  { code: "BT", name: "Batticaloa", provinceCode: "EP" },
  { code: "AP", name: "Ampara", provinceCode: "EP" },

  { code: "KG", name: "Kurunegala", provinceCode: "NWP" },
  { code: "PT", name: "Puttalam", provinceCode: "NWP" },

  { code: "AN", name: "Anuradhapura", provinceCode: "NC" },
  { code: "PO", name: "Polonnaruwa", provinceCode: "NC" },

  { code: "BD", name: "Badulla", provinceCode: "UP" },
  { code: "MNK", name: "Monaragala", provinceCode: "UP" },

  { code: "RT", name: "Ratnapura", provinceCode: "SGP" },
  { code: "KE", name: "Kegalle", provinceCode: "SGP" }
];

const stations = [
  { code: "CO-01", name: "Colombo Fort", districtCode: "CO" },
  { code: "GA-01", name: "Negombo", districtCode: "GA" },
  { code: "KL-01", name: "Kalutara North", districtCode: "KL" },

  { code: "KY-01", name: "Kandy", districtCode: "KY" },
  { code: "MT-01", name: "Matale", districtCode: "MT" },
  { code: "NW-01", name: "Nuwara Eliya", districtCode: "NW" },

  { code: "GL-01", name: "Galle", districtCode: "GL" },
  { code: "MTB-01", name: "Matara", districtCode: "MTB" },
  { code: "HB-01", name: "Hambantota", districtCode: "HB" },

  { code: "JN-01", name: "Jaffna", districtCode: "JN" },
  { code: "KLN-01", name: "Kilinochchi", districtCode: "KLN" },
  { code: "MN-01", name: "Mannar", districtCode: "MN" },
  { code: "MV-01", name: "Mullaitivu", districtCode: "MV" },
  { code: "VP-01", name: "Vavuniya", districtCode: "VP" },

  { code: "TR-01", name: "Trincomalee", districtCode: "TR" },
  { code: "BT-01", name: "Batticaloa", districtCode: "BT" },
  { code: "AP-01", name: "Ampara", districtCode: "AP" },

  { code: "KG-01", name: "Kurunegala", districtCode: "KG" },
  { code: "PT-01", name: "Puttalam", districtCode: "PT" },

  { code: "AN-01", name: "Anuradhapura", districtCode: "AN" },
  { code: "PO-01", name: "Polonnaruwa", districtCode: "PO" },

  { code: "BD-01", name: "Badulla", districtCode: "BD" },
  { code: "MNK-01", name: "Monaragala", districtCode: "MNK" },

  { code: "RT-01", name: "Ratnapura", districtCode: "RT" },
  { code: "KE-01", name: "Kegalle", districtCode: "KE" }
];

const districtCoords = {
  CO: { lat: 6.9271, lng: 79.8612 },
  GA: { lat: 7.0840, lng: 79.9945 },
  KL: { lat: 6.5854, lng: 79.9607 },
  KY: { lat: 7.2906, lng: 80.6337 },
  MT: { lat: 7.4675, lng: 80.6234 },
  NW: { lat: 6.9497, lng: 80.7891 },
  GL: { lat: 6.0535, lng: 80.2210 },
  MTB: { lat: 5.9549, lng: 80.5540 },
  HB: { lat: 6.1241, lng: 81.1185 },
  JN: { lat: 9.6615, lng: 80.0255 },
  KLN: { lat: 9.3803, lng: 80.3770 },
  MN: { lat: 8.9810, lng: 79.9040 },
  MV: { lat: 9.2671, lng: 80.8142 },
  VP: { lat: 8.7514, lng: 80.4980 },
  TR: { lat: 8.5874, lng: 81.2152 },
  BT: { lat: 7.7170, lng: 81.7000 },
  AP: { lat: 7.2914, lng: 81.6747 },
  KG: { lat: 7.4863, lng: 80.3647 },
  PT: { lat: 8.0408, lng: 79.8394 },
  AN: { lat: 8.3114, lng: 80.4037 },
  PO: { lat: 7.9396, lng: 81.0027 },
  BD: { lat: 6.9934, lng: 81.0550 },
  MNK: { lat: 6.8728, lng: 81.3507 },
  RT: { lat: 6.6828, lng: 80.3994 },
  KE: { lat: 7.2513, lng: 80.3464 }
};

module.exports = { provinces, districts, stations, districtCoords };